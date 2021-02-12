import axios from 'axios'


function getAxtiosInstance() {
  return axios.create({
    baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
    timeout: 60000
  });
}


export const get = function get(uri: string, params?: Object) {
  return getAxtiosInstance().get(uri, { params })
}


export const post = function post(uri: string, body?: Object) {
  return getAxtiosInstance().post(uri, body)
}


export const deleteReq = function deleteReq(uri: string) {
  return getAxtiosInstance().delete(uri)
}


export const patch = function patch(uri: string, body?: Object) {
  return getAxtiosInstance().patch(uri, body)
}