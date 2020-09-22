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
let settings = null

export default () => {
  const [template, setTemplate] = useState()

  useEffect(() => {
    const tem = new Card().palette()
    setTemplate(tem)

    void getUserInfo()

//    Taro.getSetting({
//      success: function (res) {
//        if (!res.authSetting["scope.writePhotosAlbum"]) {
//          Taro.authorize({
//            scope: "scope.writePhotosAlbum",
//            success: function () {
//            },
//          })
//        }
//      },
//    })
  }, [])

  const getUserInfo = async () => {
    settings = await Taro.getSetting()
  }

  const onImgOK = (e) => {
    imagePath = e.detail.path
  }

  const saveImage = async () => {
    await getUserInfo()

    Taro.getSetting({
      success: function (res) {
        if (!res.authSetting["scope.writePhotosAlbum"]) {
          Taro.authorize({
            scope: "scope.writePhotosAlbum",
            success: function () {
            },
            fail: function () {
              Taro.openSetting()
            },
          })
        }
      },
    })
    if (settings.authSetting["scope.writePhotosAlbum"] === true) {
      await Taro.saveImageToPhotosAlbum({
        filePath: imagePath,
        success: () => {
          Taro.showToast({
            title: "保存成功",
            icon: "success",
            duration: 2000,
          })
        },
      })
    } else if(settings.authSetting["scope.writePhotosAlbum"] === false) {
      await Taro.openSetting()
    }
  }

  return (
    <Container>
      <painter palette={template} onImgOK={onImgOK}/>
      <EyButton onClick={saveImage} value='保存到相册'></EyButton>
    </Container>
  )
}
