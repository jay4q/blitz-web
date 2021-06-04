import { encode } from 'blurhash'

const COMPRESS_THRESHOLD = 256

/**
 * 异步加载图片
 * @param src 
 */
export const loadImage = async (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = (...args) => reject(args)
    img.src = src
  })

/**
* 获取图片数据
* @param image 
*/
export const getImageData = (image: HTMLImageElement) => {
  let targetWidth, targetHeight = 0

  if (image.width > COMPRESS_THRESHOLD) {
    targetWidth = COMPRESS_THRESHOLD
    targetHeight = image.height * COMPRESS_THRESHOLD / image.width
  } else {
    targetWidth = image.width
    targetHeight = image.height
  }

  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  const context = canvas.getContext('2d')
  context?.drawImage(image, 0, 0, image.width, image.height, 0, 0, targetWidth, targetHeight)
  return context?.getImageData(0, 0, targetWidth, targetHeight)
}

/**
 * 获取图片模糊哈希
 * @param src 
 */
export const getBlurhash = async (src: string | HTMLImageElement) => {
  let image: HTMLImageElement

  if (typeof src === 'string') {
    image = await loadImage(src)
  } else {
    image = src
  }

  const imageData = getImageData(image)

  if (imageData) {
    const res = encode(imageData.data, imageData.width, imageData.height, 4, 4)
    return res
  } else {
    return undefined
  }
}