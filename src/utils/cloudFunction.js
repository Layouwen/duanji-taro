import Taro from "@tarojs/taro"
import request from "./request"
import { getCookies } from "./cookie"

export default (model, func_name, requestOptions = {}) => (params, extend = {}) =>
  request
    .config(requestOptions)
    .post(`basebone/client/${model}/func/`, {func_name, params, ...extend})

export const downloadFunction = (model, func_name) => params =>
  // TODO Loading效果
  Taro.downloadFile({
    url: `${
      process.env.API_BASE_URL
    }/basebone/client/${model}/func/?func_name=${func_name}&params=${JSON.stringify(params)}`,
    header: {Cookie: getCookies()},
  })
