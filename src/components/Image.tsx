import { useBoolean } from 'ahooks'
import classNames from 'classnames'
import { useNativeLazyLoading } from 'hooks/use-native-lazy-loading'
import mediumZoom from 'medium-zoom'
import { ImgHTMLAttributes, memo, useCallback, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { BlurImage } from './Blur'

const ZOOM = mediumZoom()

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  hash?: string

  /**
   * 是否支持缩放
   */
  zoomable?: boolean
}

export const Image = memo<Props>(({ hash, className, onLoad, onClick, zoomable = true, ...restProps }) => {
  const zoomRef = useRef(ZOOM.clone({ background: 'white' }))

  const supportsLazyLoading = useNativeLazyLoading()
  const { ref, inView } = useInView({
    triggerOnce: true,
    skip: supportsLazyLoading !== false,
  })

  const [isLoaded, { setTrue: setImageLoaded }] = useBoolean(false)
  const [delayLoaded, { setTrue: setDelayLoaded }] = useBoolean(false)

  const attachZoom = useCallback((ref) => {
    if (zoomable) {
      zoomRef.current.attach(ref)
    } else {
      zoomRef.current.detach(ref)
    }
  }, [zoomable])

  const onImageLoad = useCallback((e: any) => {
    setImageLoaded()

    if (onLoad) {
      onLoad(e)
    }

    if (hash) {
      // 如果有模糊图，加载完毕后延迟从视图中移除
      setTimeout(() => {
        setDelayLoaded()
      }, 500)
    }
  }, [hash, onLoad, setImageLoaded, setDelayLoaded])

  const onImageClick = useCallback((e: any) => {
    if (!zoomable && onClick) {
      onClick(e)
    }
  }, [zoomable, onClick])

  return (
    <div ref={ref} className={classNames('relative overflow-hidden', className)} onClick={onImageClick}>
      {
        (inView || supportsLazyLoading) && (
          <img
            alt='img'
            {...restProps}
            ref={attachZoom}
            loading='lazy'
            className='absolute inset-0 w-full h-full object-cover object-center m-0'
            onLoad={onImageLoad}
          />
        )
      }
      {
        hash && !delayLoaded && (
          <BlurImage
            hash={hash}
            className={classNames('absolute inset-0 w-full h-full transition-opacity duration-500', isLoaded ? 'opacity-0' : 'opacity-100')}
          />
        )
      }
    </div>
  )
})