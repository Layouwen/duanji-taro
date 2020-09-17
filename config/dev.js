import {config} from "dotenv"

config()

export default {
  env: {
    NODE_ENV: "\"development\"",
    WEAPPID: process.env && process.env.WEAPPID ? process.env.WEAPPID : "wx39ee261527919e3a",
    API_BASE_URL: process.env.API_BASE_URL ? process.env.API_BASE_URL : "\"http://192.168.31.232:8003\"",
  },
  defineConstants: {},
  mini: {},
  h5: {}
}
