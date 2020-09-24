import Taro from "@tarojs/taro";
import { setCookies, getCookies } from "./cookie";
import { login } from "./auth";
import querystring from "querystring";

const authFailModal = { modal: undefined }
async function showAuthModal(errMsg) {
  if (authFailModal.modal) {
    return await authFailModal.modal
  }

  authFailModal.modal = Taro.showModal({
    title: '登录信息无效',
    content: errMsg,
    showCancel: false,
    confirmText: '重试',
  })
  try {
    return await authFailModal.modal
  } finally {
    authFailModal.modal = undefined
  }
}

const defaultOptions = {
  baseURL: "https://duanji.gitmen.cn",
//  baseURL: "http://192.168.31.186:8003",
  // baseURL: "http://127.0.0.1:8003",
};

function handHeader(header) {
  /**
   * 处理请求头，因为小程序不支持 set-cookie，cookie 的数据
   * 都被存放到 localstorage 中，这里对请求头做各种适配
   *
   * @param header object 调用传进的请求头
   */

  const defaultHeader = {
    "Content-Type": "application/json",
  };
  let nextHeader = { ...header, ...defaultHeader };
  const cookies = getCookies();

  if (cookies) {
    nextHeader["Cookie"] = cookies;
  }

  return nextHeader;
}

async function request(
  method,
  path,
  { data = {}, header = {} } = {},
  { baseURL }
) {
  let response = {};
  Taro.showNavigationBarLoading();
  try {
    console.log({
      method,
      data,
      header: handHeader(header),
      url: baseURL + (path.startsWith("/") ? path : "/" + path),
    });

    response = await Taro.request({
      method,
      data,
      header: handHeader(header),
      url: baseURL + (path.startsWith("/") ? path : "/" + path),
    });
  } catch (reason) {
    return Promise.reject(reason);
  } finally {
    Taro.hideNavigationBarLoading();
  }

  const { data: responseData, header: responseHeader } = response;

  // 设置 cookie 到 localstorage 中
  setCookies(responseHeader);

  const error_code = parseInt(responseData.error_code, 10);

  if (error_code === 403) {
    if(showAuthModal){
      await showAuthModal(responseData.error_message)
    }
    await login();
    console.log(1)
    return await request(...arguments);
  }
  if (error_code !== 0) {
    await Taro.showToast({ title: responseData.error_message, icon: "none" });
    return Promise.reject(responseData);
  }

  return responseData.result;
}

class Request {
  constructor(options = {}) {
    this.options = { ...defaultOptions, ...options };
  }

  config(options) {
    return new Request(options);
  }

  request = (...args) => request(...args, this.options);

  get = (path, query = {}) =>
    this.request("GET", path, {
      data: querystring.parse(querystring.stringify(query)),
    });
  post = (path, body = {}) => this.request("POST", path, { data: body });
  patch = (path, body = {}) => this.request("PATCH", path, { data: body });
  put = (path, body = {}) => this.request("PUT", path, { data: body });
  delete = (path) => this.request("DELETE", path, {});
}

export default new Request();
