import { Image, Picker, View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { styled } from "linaria/react"
import React, { useEffect, useState } from "react"
import { AtButton, AtList, AtListItem, AtTextarea } from "taro-ui"
import tip from "../../assets/images/tip.png"
import MainButton from "../../components/MainButton"
import { create_link } from "../../utils/api"

const Container = styled(View)`
  height: 100vh;
  padding: 0 44px;
  > Image {
    width: 100%;
    height: 200px;
    margin: 10px 0;
    background: #f8ebe2;
  }
  > .picker {
    margin: 20px 0;
  }
`

const ButtonWrapper = styled(View)`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  > .button {
    width: 300px;
    height: 56px;
    margin: 0;
    line-height: 56px;
    color: #1254aa;
    border: 2px solid #1254aa;
  }
`

const select = {
  item: ["查看同款商品", "查看视频同款", "购买同款商品", "购买视频同款", "点击查看同款", "点击购买商品", "点击购买同款", "买同款点这里", "视频同款商品"],
  current: "查看同款商品",
  number: 0,
}

let linkStr = ""
let searchStr = null

const notLink = () => {
  Taro.showToast({
    title: "暂不支持该链接",
    icon: "none",
    duration: 2000,
  })
}

const successLink = () => {
  Taro.showToast({
    title: "转换成功，请去历史记录查看链接",
    icon: "none",
    duration: 2000,
  })
}

let {id} = Taro.getStorageSync("userinfo")

const ShopLink = () => {
  const [inputValue, setInputValue] = useState("")
  const [selector, setSelector] = useState(select)

  useEffect(() => {
    if (inputValue) {
      linkStr = inputValue
    }
  }, [inputValue])

  const countNumber = (value) => {
    setInputValue(value)
  }

  const getClipboard = () => {
    Taro.getClipboardData().then(res => setInputValue(res.data))
  }

  const clearValue = () => {
    setInputValue("")
    linkStr = ""
    searchStr = null
  }

  const onSelect = (e) => {
    const index = e.detail.value
    setSelector({...selector, current: selector.item[index], number: index})
  }

  const startLink = async () => {
    const linkList = [
      {type: 1, link: "https://u.jd.com/"},
//      {type: 2, link: "https://p.pinduoduo.com/"},
    ]
    const reg = "(https|http)?://(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((/[0-9a-zA-Z_!~*().;?:@&=+$,%#-]*)+)?"
    searchStr = linkStr.match(reg)
    if (inputValue !== "" && searchStr !== null) {
      let flag = false
      let type = 1
      linkList.forEach(item => {
        if (searchStr[0].indexOf(item.link) === 0) {
          flag = true
          type = item.type
        }
      })
      if (flag) {
        getCreateLink(selector.current, parseInt(id), searchStr[0], type).then(
          () => {
            successLink()
          },
          () => {

          },
        )
        return
      }
    }
    notLink()
  }

  const getCreateLink = async (title, user, link, type) => {
    return await create_link({title, link, user, type})
  }

  return (
    <Container>
      <Image src={tip}/>
      <AtTextarea
        value={inputValue}
        height={200}
        onChange={countNumber}
        maxLength={500}
        placeholder='将京东商品信息粘贴到此处...'
        placeholderStyle='color: #c9c9c9;'
      />
      <ButtonWrapper>
        <AtButton className='button' type='secondary' onClick={getClipboard}>快速粘贴</AtButton>
        <AtButton className='button' type='secondary' onClick={clearValue}>清空内容</AtButton>
      </ButtonWrapper>
      <Picker className='picker' value={selector.number} mode='selector' range={selector.item} onChange={onSelect}>
        <AtList>
          <AtListItem
            title='引导词'
            extraText={selector.current}
          />
        </AtList>
      </Picker>
      <MainButton fn={startLink}>开始转链</MainButton>
    </Container>
  )
}

export default ShopLink
