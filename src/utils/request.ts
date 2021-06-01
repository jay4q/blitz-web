import { extend, ResponseError } from 'umi-request'
import { toast } from 'react-toastify'

const CODE_MAP: { [key in string]: string } = {
  "400": "请求内容有误",
  "401": "您尚未登录",
  "403": "抱歉，您没有访问权限",
  "404": "无法处理的请求",
  "406": "请求的格式有误",
  "408": "请求超时，请稍后再试",
  "410": "资源已被删除",
  "422": "发生验证错误",
  "500": "服务器出错",
  "502": "网关错误",
  "503": "服务不可用，服务器暂时过载或维护",
  "504": "网关超时",
  "999": "网络连接出错，请稍后重试"
}

const errorHandler = (e: ResponseError<IResponse>): IResponse => {
  if (e.response) {
    return {
      data: e.data.data,
      code: e.data.code || e.response.status,
      message: e.data.message || CODE_MAP[`${e.response.status}`] || '服务器异常，请稍后再试'
    }
  } else {
    // 请求发不出去
    toast.error(CODE_MAP['999'])
    return {
      code: 999,
      message: CODE_MAP['999']
    }
  }
}

export const request = extend({
  prefix: process.env.REACT_APP_RESTFUL,
  headers: {
    // 🤔️ umi-request 这里有点问题，默认是 'text/plain'，但文档里说默认是 'application/json'
    'Content-Type': 'application/json;charset=UTF-8',
  },
  errorHandler,
})

// todo: 如果需要权限，可以在继续添加 token 相关中间件

// 业务异常报错
request.use(async (ctx, next) => {
  await next()

  const res = ctx.res as IResponse
  if (200 !== res.code) {
    toast.error(res.message)
  }
})