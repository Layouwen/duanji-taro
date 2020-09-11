import React, {useState} from "react"
import {Button} from "@tarojs/components"
import {AtModal, AtModalHeader, AtModalContent, AtModalAction} from "taro-ui"

const EyLogin = () => {
  const [showModal, setShowModal] = useState(true)
  const onClose = () => {
    setShowModal(false)
  }
  const getUserInfo = (data) => {
    console.log(data)
    onClose()
  }
  return (
    <AtModal isOpened={showModal}>
      <AtModalHeader>微信授权</AtModalHeader>
      <AtModalContent>
        这里是正文内容，欢迎加入京东凹凸实验室
      </AtModalContent>
      <AtModalAction>
        <Button onClick={onClose}>取消</Button>
        <Button openType='getUserInfo' onGetUserInfo={getUserInfo}>确定</Button>
      </AtModalAction>
    </AtModal>)
}

export default EyLogin
