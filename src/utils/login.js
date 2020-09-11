import Taro from "@tarojs/taro"
import {} from "taro-ui"

const checkLogin = async () => {
  const res = await Taro.getSetting()
  return res.authSetting["scope.userInfo"]
}

const login = () => {

}

export {checkLogin, login}
