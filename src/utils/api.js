import request from "./request"

export const list_link = (user, pageSize, pageNumber) => request.get(`/api/list_link/`, {user, pageSize, pageNumber})
export const list_question = () => request.get(`/api/list_question/`)
export const create_link = (data) => request.post(`api/create_link/`, data)
export const get_short_link = (data) => request.post(`api/get_short_link/`, data)
