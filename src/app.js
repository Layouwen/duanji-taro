import { Component } from "react"
import "taro-ui/dist/style/index.scss"
import "./app.scss"
import { checkLogin } from "./utils/auth"

class App extends Component {

  componentDidMount() {
    checkLogin()
    console.log(1)
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
