import React, { useEffect, useState } from "react"
import Taro from "@tarojs/taro"
import { View } from "@tarojs/components"
import { styled } from "linaria/react"
import Card from "../../canvas/card"
import EyButton from "../../components/EyButton"

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #222;
`

let imagePath = ""

export default () => {
  const [template, setTemplate] = useState()

  useEffect(() => {
    const tem = new Card().palette()
    setTemplate(tem)


  }, [])

  const onImgOK = (e) => {
    imagePath = e.detail.path
    console.log(e)
  }

  const saveImage = async () => {
    await Taro.saveImageToPhotosAlbum({
      filePath: imagePath,
    })
  }

  return (
    <Container>
      <painter palette={template} onImgOK={onImgOK}/>
      <EyButton onClick={saveImage} value='分享'></EyButton>
    </Container>
  )
}
