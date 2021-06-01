import { useBoolean } from 'ahooks'
import classNames from 'classnames'
import { FunctionComponent, ImgHTMLAttributes, CSSProperties } from 'react'

export type BlurImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'layout' | 'width' | 'height'> & {
  /**
   * 图片容器的样式
   * @description 一般需要填写宽和高，因此这里设为必填
   */
  className?: string

  /**
   * 是否使用图片点击缩放
   * @description 默认不开启
   */
  enableZoom?: boolean

  /**
   * 可以用于占位用的资源
   * @description 一般是 base64
   */
  blurSrc?: string | null

  /**
   * 图片容器样式
   */
  style?: CSSProperties
}

/**
 * 优化后的图片组件
 */
export const BlurImage: FunctionComponent<BlurImageProps> = ({
  style,
  blurSrc,
  children,
  className,
  enableZoom,
  ...imageProps
}) => {
  const [isImageReady, { setTrue }] = useBoolean(false)

  return (
    <div style={{ ...(style || {}) }} className={classNames('overflow-hidden', className)}>
      <img alt='' {...imageProps} className='absolute inset-0 w-full h-full object-cover object-center m-0' onLoad={setTrue} />
      {
        blurSrc && (
          <div className={classNames('absolute inset-0 w-full h-full bg-transparent transition duration-700 ease-in-out', isImageReady ? 'opacity-0' : 'opacity-100')}>
            <img
              alt=''
              src={blurSrc}
              className='absolute inset-0 w-full h-full object-cover object-center'
              style={{ margin: '0px' }}
            />
            <div className='absolute inset-0 w-full h-full bg-transparent backdrop-filter backdrop-blur'></div>
          </div>
        )
      }
      {
        children
      }
    </div>
  )
}