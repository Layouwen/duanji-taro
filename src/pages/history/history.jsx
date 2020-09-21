import React, { useEffect, useState } from "react"
import Taro from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import { styled } from "linaria/react"
import { list_link } from "../../utils/api"

const Container = styled(View)`
  min-height: 100vh;
  padding: 0 20px 60px 20px;
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
  font-size: 24px;
`

const Item = styled(View)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 160px;
  padding: 24px;
  margin-top: 20px;
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
    margin-top: 20px;
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

const NotContent = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
`

const LoadMore = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 132px;
  color: #4680C6;
  text-decoration: underline;
 `

const {id} = Taro.getStorageSync("userinfo")
let pageNumber = 0
const pageSize = 8
let postRequest

const History = () => {
  const [historyItem, setHistoryItem] = useState([])
  const [isMore, setIsMore] = useState(true)

  useEffect(() => {
    loadMore()
    return () => {
      clearInterval(postRequest)
    }
  }, [])

  useEffect(() => {
      let flag = false
      historyItem.forEach(item => {
        if (item["expand_link"] === null) {
          flag = true
        }
      })
      if (flag) {
        clearInterval(postRequest)
        post()
      }
    },
  )

  const post = () => {
    postRequest = setInterval(() => {
      refresh()
    }, 7000)
  }

  const initData = async () => {
    pageNumber = 0
    await setIsMore(true)
    const res = await list_link(id, pageSize, ++pageNumber)
    setIsMore(res.next !== null)
    setHistoryItem(res.results)
  }

  const refresh = async () => {
    console.log(historyItem.length)
    const res = await list_link(id, historyItem.length, 1)
    setHistoryItem(res.results)
  }

  const copyLink = (url) => {
    void Taro.setClipboardData({
      data: url,
      fail: () => {
        void Taro.showToast({title: "复制失败", icon: "none", duration: 1000})
      },
    })
  }

  const loadMore = async () => {
    if (isMore === false) return
    await Taro.showToast({title: "加载数据中", icon: "loading"})
    const res = await list_link(id, pageSize, ++pageNumber)
    setIsMore(res.next !== null)
    setHistoryItem([...historyItem, ...res.results])
    Taro.hideToast()
  }


  return (
    <Container>
      <Title>
        <View className='top'>
          <Text>共有{historyItem ? historyItem.length : 0}个链接</Text>
          <Text onClick={initData}>刷新</Text>
        </View>
      </Title>
      <ContentWrapper>
        {historyItem.length > 0 ? historyItem.map(item => (
          <Item key={item.id}>
            <View className='title'>
              <Text>[新版]</Text>
              <Text>{item.title}</Text>
            </View>
            <View className='bottom'>
              <Text>{item.time}</Text>
              {/*<Text>阅读 {item.read}</Text>*/}
              {item.expand_link ? <Text onClick={() => copyLink(item.expand_link)}>复制链接</Text> : <Text>正在生成中...</Text>}
            </View>
          </Item>),
        ) : <NotContent>
          暂无历史记录
        </NotContent>}
        {historyItem.length === 0 ? null : isMore ? <LoadMore onClick={loadMore}>点击加载历史链接</LoadMore> :
          <LoadMore>暂无更多</LoadMore>}
      </ContentWrapper>
    </Container>
  )
}

export default History
