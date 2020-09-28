import React from "react"
import { Button, Image, Text, View } from "@tarojs/components"
import { styled } from "linaria/react"

const Wrapper = styled(View)`
  > .button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    width: 320px;
    margin-top: 32px;
    font-size: 28px;
    color: #fff;
    border-radius: 12px;
    background: #ff6700;
    > Image {
      width: 40px;
      height: 40px;
      margin-right: 8px;
    }
  }
`

const EyButton = (props) => {
  const {src, onClick, type, value} = props

  return (
    <Wrapper>
      <Button className='button-wrapper' onClick={onClick} openType={type}>
        {src ? <Image src={src}/> : null}
        <Text>{value}</Text>
      </Button>
    </Wrapper>
  )
}

export default EyButton
