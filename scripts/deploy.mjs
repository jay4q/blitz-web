import { config } from 'dotenv'
import * as path from 'path'

const ENV_FILE = '.env.production.local'

const env = config({
  path: path.resolve(process.cwd(), ENV_FILE)
})

if (!env.error) {
  const subpath = env.parsed.REACT_APP_SUBPATH
  const envId = env.parsed.REACT_APP_ENV_ID

  if (envId) {
    await $`rm -rf build`
    await $`tcb hosting delete ${subpath} -e ${envId}`
    console.log(chalk.green('🎉🎉🎉 旧代码清理成功'))
    await $`yarn build`
    console.log(chalk.green('🎉🎉🎉 成功编译'))
    await $`tcb hosting deploy ./build ${subpath} -e ${envId}`
    console.log(chalk.green('🎉🎉🎉 成功部署'))
  } else {
    console.log(chalk.red(`请检查 ${ENV_FILE}/REACT_APP_ENV_ID 环境变量是否填写`))
  }
} else {
  console.log(chalk.red('失败'))
}