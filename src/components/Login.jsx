import React, { useState } from "react"
import { Button } from "@tarojs/components"
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"

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
      <AtModalHeader>权限授权</AtModalHeader>
      <AtModalContent>
        获取微信昵称以及微信头像以保存数据
      </AtModalContent>
      <AtModalAction>
        <Button onClick={onClose}>取消</Button>
        <Button openType='getUserInfo' onGetUserInfo={getUserInfo}>确定</Button>
      </AtModalAction>
    </AtModal>)
}

export default EyLogin
