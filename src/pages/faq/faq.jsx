import React from "react"
import {styled} from "linaria/react"
import {View} from "@tarojs/components"
import FaqItem from "../../components/FaqItem"

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #ededed;
  > .item {
    margin-top: 20px;
  }
`

const Faq = () => {
  return (
    <Container>
      <FaqItem className='item' title='你好' content='一键生成视频号扩展链接的小程序，帮助视频号创作者零门槛'/>
    </Container>
  )
}

export default Faq
