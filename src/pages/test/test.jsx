import React, { useEffect } from "react"
import Taro from "@tarojs/taro"
import { Button, Canvas, View } from "@tarojs/components"
import { styled } from "linaria/react"

const WIDTH = 660
const HEIGHT = 960

const Container = styled(View)`
  height: 100vh;
  > Canvas {
    border: 1px solid red;
  }
`

export default () => {
  const draw = () => {
    const ctx = Taro.createCanvasContext("share")
    console.log(ctx)
    drawBg(ctx)
    drawHeader(ctx)
  }

  const drawBg = (ctx) => {
    ctx.rect(0, 0, WIDTH, HEIGHT)
    ctx.setStrokeStyle("#ffc7c7")
    ctx.stroke()

    const grd = ctx.createLinearGradient(0, 0, 0, WIDTH)
    grd.addColorStop(0, "#ffdede")
    grd.addColorStop(1, "#000")

    ctx.setFillStyle(grd)
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
  }

  const drawHeader = (ctx) => {
    ctx.moveTo(107, 42)
    ctx.lineTo(107 + 139, 42)

    ctx.moveTo(414, 42)
    ctx.lineTo(414 + 139, 42)

    ctx.setStrokeStyle("#fe8787")
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(107 + 139 + 5, 42, 5, 0, 2 * Math.PI)
    ctx.fillStyle = "#fe8787"
    ctx.fill()

    ctx.beginPath()
    ctx.arc(414 + 5, 42, 5, 0, 2 * Math.PI)
    ctx.fillStyle = "#fe8787"
    ctx.fill()

    ctx.font = "32px STSongti-SC-Regular,sans-serif"
    ctx.fillStyle = "#fe8787"
    ctx.setTextAlign("center")
    ctx.setTextBaseline("middle")
    ctx.fillText("邀请卡", WIDTH / 2, 42)
  }
  return (
    <Container>
      <Canvas
        calssName='canvas'
        canvasId='share'
        style={`width: ${WIDTH}px; height: ${HEIGHT}px;`}
      />
      <Button onClick={draw}> adfasdf 1 </Button>
    </Container>
  )
}
