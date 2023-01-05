import { AxiosRequestConfig, AxiosResponse } from '../types/index'

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(message: string, config: AxiosRequestConfig, code?: string | null, request?: any, response?: AxiosResponse) {
    super()
    this.code = code
    this.config = config
    this.request = request
    this.response = response
    this.isAxiosError = true

    // 改变原型 在ts中继承一些内置对象时 有的方法可能调用不了 需要以下代码来改变原型
    // 但是改变原型有点消耗性能
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(message: string, config: AxiosRequestConfig, code?: string | null, request?: any, response?: AxiosResponse) {
  const error = new AxiosError(message, config, code, request, response)
  return error
}
