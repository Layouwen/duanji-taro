import React from "react"
import {AtButton} from "taro-ui"
import {View} from "@tarojs/components"
import {styled} from "linaria/react"

const Container = styled(View)`
  padding: 20px 66px;
  > .button {
    height: 80px;
    line-height: 80px;
    box-shadow: 0 4px 12px 0 rgba(0,0,0,.4);
    border: none;
    background: #ff6700;
  }
`

const MainButton = (props) => {
  return (
    <Container>
      <AtButton className='button' circle type='primary' onClick={props.fn}>{props.children}</AtButton>
    </Container>
  )
}

export default MainButton
