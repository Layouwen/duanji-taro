import React, {useEffect, useState} from "react"
import Taro from "@tarojs/taro"
import {styled} from "linaria/react"
import {View} from "@tarojs/components"
import FaqItem from "../../components/FaqItem"

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 80px;
  background: #ededed;
  > .item {
    margin-top: 20px;
  }
`

const Faq = () => {
  const [faqItem, setFaqItem] = useState([])
  const getFaqItem = async () => {
    const {data: {results}} = await Taro.request({
      url: "http://127.0.0.1:9527/api/faq"
    })
    setFaqItem(results)
  }
  useEffect(() => {
    getFaqItem()
  }, [])
  return (
    <Container>
      {faqItem.length > 0 ? faqItem.map(item => (
        <FaqItem className='item' title={item.title} content={item.content}/>
      )) : null}
    </Container>
  )
}

export default Faq
