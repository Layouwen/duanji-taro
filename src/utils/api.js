import request from "./request"
import cloudFunction from "./cloudFunction"

export const list_link = (id, pageSize, pageNumber) => request.get(`/api/list_link/?user=${id}&pageSize=${pageSize}&pageNumber=${pageNumber}`)
export const list_question = () => request.get(`/api/list_question/`)
export const create_link = (data) => request.post(`api/create_link/`, data)
export const get_short_link = (data) => request.post(`api/get_short_link/`, data)
