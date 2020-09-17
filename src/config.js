const config = {
  set(key, value) {
    config[key] = value
    return config[key]
  },
  delete(key) {
    delete config[key]
  },
  host: "https://coc.gitmen.cn",
  association: "123456",
}

export default config
