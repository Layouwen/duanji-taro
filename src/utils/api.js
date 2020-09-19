import request from "./request"

export const list_link = (id, pageSize, pageNumber) => request.get(`/api/list_link/?user=${id}`)
export const list_question = () => request.get(`/api/list_question/`)
