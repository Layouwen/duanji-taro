import Taro from "@tarojs/taro"
import request from "./request"

const handle403Promise = { promise: undefined }

// 控制并发，在同一时刻只需要一个登录流程
export async function login() {
  if (handle403Promise.promise) {
    return await handle403Promise.promise
  }

  handle403Promise.promise = weappLogin(...arguments)
  try {
    return await handle403Promise.promise
  } finally {
    handle403Promise.promise = undefined
  }
}

const {
  miniProgram: {appId: appid},
} = Taro.getAccountInfoSync()

async function weappLogin() {
  const {code} = await Taro.login()
  const userinfo = await request.post("basebone/member/login/weapp/", {
    code,
    appid,
  })
  Taro.setStorageSync("userinfo", userinfo)
}

export async function updateUserData(data) {
  /**
   * data
   * {
          "appid": "",
          "enc_data": "",
          "iv": ""
      }
   */
  return request.post("basebone/member/update/weapp/", {...data, appid})
}

export async function checkLogin() {
  try {
    await Taro.checkSession()
  } catch (e) {
    await login()
  }
  const {username} = Taro.getStorageSync("userinfo")
  if (!username) {
    await login()
  }
}

export async function checkUserinfo() {
  await checkLogin()
  const {avatar, name, mobile, entrepreneur = []} = Taro.getStorageSync("userinfo")

  const isUpdateUser = !!(avatar && name)
  const isMobileBind = !!(mobile && entrepreneur[0])

  return {isMobileBind, isUpdateUser}
}




