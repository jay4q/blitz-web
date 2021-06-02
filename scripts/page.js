/**
 * 一键生成页面/路由组件
 * 使用方法：yarn page path/to/new-page
 */

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const OVR_APP = './src/pages/index.tsx'
const OVR_PATH = './src/configs/path.ts'

// tsx模板，可以根据业务调整
const tsxTempl = (pageName = '自动生成的页面') => `import { Fragment, PureComponent } from 'react'
import { Helmet } from 'react-helmet'

/**
 * ${pageName}
 */
export default class Index extends PureComponent {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>${pageName}</title>
        </Helmet>
      </Fragment>
    )
  }
}`

function checkPath(relativePath) {
  if (!relativePath) {
    console.log(chalk.red('请提供页面路径'))
    process.exit(0)
  }

  try {
    const stat = fs.statSync(path.join(__dirname, '../src/pages/', relativePath))
    if (stat.isDirectory()) {
      console.log(chalk.red(`路径<${relativePath}>已存在`))
      process.exit(0)
    } else {
      return relativePath
    }
  } catch (e) {
    // 一般表示该路径不存在
    return relativePath
  }
}

const relativePath = checkPath(process.argv[2])
const pageName = process.argv[3]
const pagePath = `./src/pages/${relativePath}`

// 尝试生成页面相关文件
try {
  fs.mkdirSync(pagePath, { recursive: true })
  fs.writeFileSync(`${pagePath}/index.tsx`, tsxTempl(pageName))

  // 修改页面路径配置
  const prevConfigFile = fs.readFileSync(OVR_PATH, 'utf8')
  const pageAlias = relativePath.split('/').join('__')    // __表示层级区分
  if (!prevConfigFile.includes(pageAlias)) {
    fs.writeFileSync(
      OVR_PATH,
      prevConfigFile
        .replace(
          /\/\/ !!! path/,
          `// !!! path\n  '${pageAlias}': '/${relativePath}',`
        )
    )
  }

  // 修改路由配置
  const prevAppFile = fs.readFileSync(OVR_APP, 'utf8')
  if (!prevAppFile.includes(pageAlias)) {
    fs.writeFileSync(
      OVR_APP,
      prevAppFile
        .replace(
          /\/\/ !!! page/,
          `// !!! page\n  { path: PATHS['${pageAlias}'], comp: lazy(() => import('../pages/${relativePath}')) },`
        )
    )
  }

  console.log(chalk.green(`页面<${relativePath}>创建成功`))
  process.exit(0)
} catch (e) {
  console.log(chalk.red(`无法创建页面<${relativePath}> => `), e)
  process.exit(0)
}