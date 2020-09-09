import React, {useState} from "react"
import Taro from "@tarojs/taro"
import {AtTextarea, AtButton, AtList, AtListItem} from "taro-ui"
import {View, Image, Picker} from "@tarojs/components"
import {styled} from "linaria/react"
import ticp from "../../assets/images/ticp.png"
import MainButton from "../../components/MainButton"

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
    color: #5AB086;
    border: 2px solid #5AB086;
  }
`

const select = {
  item: ["查看同款商品", "查看视频同款", "购买同款商品", "购买视频同款", "点击查看同款", "点击购买商品", "点击购买同款", "买同款点这里", "视频同款商品", "自定义引导词"],
  current: "查看同款商品",
  number: 0
}

const ShopLink = () => {
  const [inputValue, setInputValue] = useState("")
  const [selector, setSelector] = useState(select)

  const countNumber = (value) => {
    setInputValue(value)
  }

  const getClipboard = () => {
    Taro.getClipboardData().then(res => setInputValue(res.data))
  }

  const clearValue = () => {
    setInputValue("")
  }

  const onSelect = (e) => {
    const index = e.detail.value
    setSelector({...selector, current: selector.item[index], number: index})
  }

  const startLink = () => {
    console.log(1)
  }

  return (
    <Container>
      <Image src={ticp}/>
      <AtTextarea
        value={inputValue}
        height={200}
        onChange={countNumber}
        maxLength={500}
        placeholder='将京东/拼多多商品信息粘贴到此处...'
        placeholderStyle='color: #c9c9c9;'
      />
      <ButtonWrapper>
        <AtButton className='button' type='secondary' onClick={getClipboard}>快速粘贴</AtButton>
        <AtButton className='button' type='secondary' onClick={clearValue}>清空内容</AtButton>
      </ButtonWrapper>
      <Picker className='picker' value={selector.number} mode='selector' range={selector.item} onChange={onSelect}>
        <AtList>
          <AtListItem
            title='国家地区'
            extraText={selector.current}
          />
        </AtList>
      </Picker>
      <MainButton fn={startLink}>开始转链</MainButton>
    </Container>
  )
}

export default ShopLink
