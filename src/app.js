import {Component} from "react"
import "taro-ui/dist/style/index.scss"
import {login} from "./utils/auth"
import "./app.scss"

class App extends Component {

  componentDidMount() {
    void login()
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
