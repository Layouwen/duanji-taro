import Taro from "@tarojs/taro"
import request from "./request"

const {
  miniProgram: {appId: appid},
} = Taro.getAccountInfoSync()

export async function login() {
  console.log("我执行了")
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




