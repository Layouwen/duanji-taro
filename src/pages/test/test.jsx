import React, { useEffect, useState } from "react"
import Taro from "@tarojs/taro"
import { Button, View } from "@tarojs/components"
import { styled } from "linaria/react"
import Card from "../../canvas/card"

const Container = styled(View)`
  height: 100vh;
`

let imagePath = ""

export default () => {
  const [template, setTemplate] = useState()

  useEffect(() => {
    const x = new Card().palette()
    setTemplate(x)
  }, [])

  const onImgOK = (e) => {
    console.log(222, e)
  }

  const onImgErr = (e) => {
    console.log(111, e)
  }

//  const saveImage = () => {
//    console.log(imagePath)
//    Taro.saveImageToPhotosAlbum({
//      filePath: imagePath,
//    })
//  }

  return (
    <Container>
      <painter customStyle='margin-left:40rpx' palette={template} imgOK={e => onImgOK(e)}/>
      {/*<Button onClick={saveImage}>11</Button>*/}
    </Container>
  )
}
