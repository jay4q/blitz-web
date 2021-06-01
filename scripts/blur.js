const { join } = require('path')
const { base64 } = require('lqip')

const rootDir = join(process.cwd(), 'public/images')

async function getBlurImage() {
  try {
    const imagePath = process.argv[2]
    if (!imagePath) {
      throw new Error('请输入图片路径')
    }

    const fullPath = join(rootDir, imagePath)
    const res = await base64(fullPath)

    console.log('～～～完成～～～')
    console.log(res)
  } catch (e) {
    console.log(e)
  }
}

getBlurImage()