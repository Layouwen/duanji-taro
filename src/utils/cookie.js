import dayjs from "dayjs"
import setCookie from "set-cookie-parser"
import {isObject} from "lodash"
import Taro from "@tarojs/taro"

export function setCookies(header) {
  /**
   * 设置 cookie 到 localStorage
   *
   * @param header string 响应头
   */
  if (!header || !isObject(header)) {
    return
  }
  let combinedCookieHeader = null
  Object.keys(header).forEach((key) => {
    // 这里只有处理的原因是有些客户端响应头返回的是 set-cookie 有些是 Set-Cookie
    if (key.toLowerCase() === "set-cookie") {
      combinedCookieHeader = header[key]
    }
  })
  if (!combinedCookieHeader) return
  const splitCookieHeaders = setCookie.splitCookiesString(combinedCookieHeader)
  const results = setCookie.parse(splitCookieHeaders)
  const cookies = Taro.getStorageSync("cookies") || []
  results.forEach((result) => {
    const index = cookies.findIndex((cookie) => cookie.name === result.name)
    if (~index) {
      if (result.value) cookies[index] = result
      else cookies.splice(index, 1)
    } else cookies.push(result)
  })
  Taro.setStorageSync("cookies", cookies)
}

export function getCookies() {
  /**
   * 获取 cookie，组装 cookie 字符串
   */
  const cookies = Taro.getStorageSync("cookies") || []
  let result = ""
  cookies.forEach((cookie) => {
    if (dayjs().isBefore(dayjs(cookie.expires))) {
      result += cookie.name + "=" + cookie.value + ";"
    }
  })
  return result
}
