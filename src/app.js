import { Component } from "react"
import Taro from "@tarojs/taro"
import "taro-ui/dist/style/index.scss"
import { login } from "./utils/auth"
import "./app.scss"

class App extends Component {

  componentDidMount() {
    try {
      const userInfo = Taro.getStorageSync("userinfo")
      if (typeof userInfo !== "object") {
        void login()
      }
    } catch (e) {
      console.error(e)
    }
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
