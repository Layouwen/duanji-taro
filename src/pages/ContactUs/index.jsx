import React from "react"
import {Image, View} from "@tarojs/components"
import {styled} from "linaria/react"

import MainButton from "../../components/MainButton"

const Container = styled(View)`
  box-sizing: border-box;
  height: 100vh;
  padding: 20px 40px 0 40px;
  > Image {
    height: 758px;
  }
`

export default () => {
  const selectQRcode = () => {
  }
  return (
    <Container>
      {/*<Image src={QRcode}/>*/}
      <MainButton fn={selectQRcode}>点击选择二维码</MainButton>
    </Container>
  )
}
