import QRcode from "../assets/images/QRcode.jpg"
import QRcodeBg from "../assets/images/QRcodeBg.png"

export default class LastMayday {
  palette() {
    return (
      {
        "width": "654rpx",
        "height": "1000rpx",
        "background": QRcodeBg,
        "views": [
          {
            "type": "image",
            "url": QRcode,
            "css": {
              "width": "120rpx",
              "height": "120rpx",
              "top": "800rpx",
              "left": "90rpx",
              "rotate": "0",
              "borderRadius": "",
              "borderWidth": "",
              "borderColor": "#000000",
              "shadow": "",
              "mode": "scaleToFill",
            },
          },
        ],
      }
    )
  }
}
