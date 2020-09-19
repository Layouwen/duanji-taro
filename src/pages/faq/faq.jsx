import React, { useEffect, useState } from "react"
import { styled } from "linaria/react"
import { View } from "@tarojs/components"
import { list_question } from "../../utils/api"
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

export default () => {
  const [faqItem, setFaqItem] = useState([])
  const getFaqItem = async () => {
    const {results} = await list_question()
    setFaqItem(results)
  }
  useEffect(() => {
    void getFaqItem()
  }, [])
  return (
    <Container>
      {faqItem.length > 0 ? faqItem.map(item => (
        <FaqItem className='item' title={item.title} content={item.content}/>
      )) : null}
    </Container>
  )
}
