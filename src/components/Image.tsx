import { useBoolean } from 'ahooks'
import classNames from 'classnames'
import { useNativeLazyLoading } from 'hooks/use-native-lazy-loading'
import { ImgHTMLAttributes, memo, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import { BlurImage } from './Blur'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  hash?: string
}

export const Image = memo<Props>(({ hash, className, onLoad, ...restProps }) => {
  const supportsLazyLoading = useNativeLazyLoading()
  const { ref, inView } = useInView({
    triggerOnce: true,
    skip: supportsLazyLoading !== false,
  })
  const [isLoaded, { setTrue: setImageLoaded }] = useBoolean(false)
  const [delayLoaded, { setTrue: setDelayLoaded }] = useBoolean(false)

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

  return (
    <div ref={ref} className={classNames('relative overflow-hidden', className)}>
      {
        (inView || supportsLazyLoading) && (
          <img
            alt='img'
            {...restProps}
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