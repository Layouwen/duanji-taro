import React from "react"
import {View, Text} from "@tarojs/components"
import {styled} from "linaria/react"
import {AtProgress} from "taro-ui"

const Container = styled(View)`
  height: 100vh;
  padding: 0 20px;
  background: #ededed;
`

const Title = styled(View)`
  display: flex;
  flex-direction: column;
  > View {
    display: flex;
    align-items: center;
    height: 60px;
  }
  > .top {
    justify-content: space-between;
    > Text:last-child {
      color: #4680C6;
      text-decoration: underline;
    }
  }
  > .bottom {
    font-size: 24px;
    > Text {
      margin-right: 30px;
    }
    > .percent {
      flex: 1;
    }
  }
`

const ContentWrapper = styled(View)`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 24px;
`

const Item = styled(View)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 160px;
  padding: 24px;
  border-radius: 8px;
  background: #fff;
  > .title {
    > Text:first-child {
      margin-right: 10px;
      color: #DB6F66;
    }
  }
  > .bottom {
    display: flex;
    > Text:first-child {
      margin-right: 10px;
    }
    > Text:last-child {
      margin-left: auto;
      color: #4680C6;
      text-decoration: underline;
    }
  }
`

const LoadMore = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 132px;
  color: #4680C6;
  text-decoration: underline;
`

const History = () => {
  return (
    <Container>
      <Title>
        <View className='top'>
          <Text>共有0个链接</Text>
          <Text>刷新</Text>
        </View>
        {/*<View className='bottom'>*/}
        {/*  <Text>新版排队进度:</Text>*/}
        {/*  <AtProgress className='percent' percent={100}></AtProgress>*/}
        {/*</View>*/}
      </Title>
      <ContentWrapper>
        <Item>
          <View className='title'>
            <Text>[新版]</Text>
            <Text>查看同款商品</Text>
          </View>
          <View className='bottom'>
            <Text>09-09 12:18</Text>
            <Text>阅读 0</Text>
            <Text>复制链接</Text>
          </View>
        </Item>
        <LoadMore>点击加载历史链接</LoadMore>
      </ContentWrapper>
    </Container>
  )
}

export default History
