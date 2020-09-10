import React from "react"
import {styled} from "linaria/react"
import {Text, View} from "@tarojs/components"

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-size: 28px;
  background: #fff;
  > .title {
    margin-bottom: 20px;
    font-weight: bold;
  }
  > .content {
    color: #8c8c8c;
  }
`

const FaqItem = (props) => {
  return (
    <Container className={props.className}>
      <Text className='title'>{props.title}</Text>
      <Text className='content'>{props.content}</Text>
    </Container>
  )
}

export default FaqItem
