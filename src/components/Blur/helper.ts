import { encode } from 'blurhash'

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
 const canvas = document.createElement("canvas")
 canvas.width = image.width
 canvas.height = image.height
 const context = canvas.getContext("2d")
 context?.drawImage(image, 0, 0)
 return context?.getImageData(0, 0, image.width, image.height)
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