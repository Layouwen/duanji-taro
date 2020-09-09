import React from "react"
import {Image, Text, View} from "@tarojs/components"
import {styled} from "linaria/react"
import {AtNoticebar} from "taro-ui"
import cart from "../../assets/images/cart.png"
import QRcode from "../../assets/images/QRcode.png"
import history from "../../assets/images/list.png"
import help from "../../assets/images/help.png"
import share from "../../assets/images/share.png"
import picture from "../../assets/images/picture.png"
import contact from "../../assets/images/contact.png"
import feedback from "../../assets/images/feedback.png"

const Container = styled(View)`
  height: 100vh;
  background: #EDEDED;
`

const BigTitle = styled(View)`
  height: 300px;
  background: #4EA570;
`

const ContentWrapper = styled(View)`
  padding: 32px;
`

const BigButton = styled(View)`
  box-sizing: border-box;
  display: flex;
  height: 160px;
  padding: 28px 40px 28px 52px;
  margin-top: 32px;
  border-radius: 12px;
  background: #61B38A;
  > View:first-child {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > Text {
      color: #fff;
      &:first-child {font-size: 40px;}
      &:last-child {font-size: 28px;}
    }
  }
  > View:last-child {
    display: flex;
    align-items: center;
    > Image {
      width: 80px;
      height: 80px;
    }
  }

`

const ButtonWrapper = styled(View)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const SmallButton = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 320px;
  margin-top: 32px;
  font-size: 28px;
  color: #fff;
  border-radius: 12px;
  background: #61B38A;
  > Image {
    width: 40px;
    height: 40px;
    margin-right: 8px;
  }
`

const Index = () => {
  return (
    <Container>
      <BigTitle></BigTitle>
      <ContentWrapper>
        <AtNoticebar icon='volume-plus' marquee>我是测试内容</AtNoticebar>
        <BigButton>
          <View>
            <Text>商品链接</Text>
            <Text>支持京东/拼多多佣金链接</Text>
          </View>
          <View>
            <Image src={cart}/>
          </View>
        </BigButton>
        <BigButton>
          <View>
            <Text>二维码链接</Text>
            <Text>支持加好友/群、邀请海报...</Text>
          </View>
          <View>
            <Image src={QRcode}/>
          </View>
        </BigButton>
        <ButtonWrapper>
          <SmallButton><Image src={history}/><Text>历史记录</Text></SmallButton>
          <SmallButton><Image src={help}/><Text>常见问题</Text></SmallButton>
          <SmallButton><Image src={share}/><Text>邀请好友</Text></SmallButton>
          <SmallButton><Image src={picture}/><Text>生成海报</Text></SmallButton>
          <SmallButton><Image src={contact}/><Text>在线客服</Text></SmallButton>
          <SmallButton><Image src={feedback}/><Text>意见反馈</Text></SmallButton>
        </ButtonWrapper>
      </ContentWrapper>
    </Container>
  )
}

export default Index
