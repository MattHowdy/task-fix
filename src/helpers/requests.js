import axios from 'axios'


function getAxtiosInstance() {
    return axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      timeout: 60000
    });
}
  

export const get = function get(uri, params) {

    return new Promise((resolve, reject) => {
      getAxtiosInstance().get(uri, {params})
        .then(result => resolve(result.data))
        .catch(error => {
          console.error(error)
          reject(error)
        })
    })
  }


export const post = function post(uri, body){

  return new Promise((resolve, reject) => {
      getAxtiosInstance().post(uri, body)
        .then(result => resolve(result.data))
        .catch(error => {
          console.error(error)
          reject(error)
      })
  })
}


export const deleteReq = function deleteReq(uri) {

  return new Promise((resolve, reject) => {
    getAxtiosInstance().delete(uri)
      .then(result => resolve(result.data))
      .catch(error => {
        console.error(error)
        reject(error)
      })
  })
}


export const patch = function patch(uri, body) {

  return new Promise((resolve, reject) => {
    getAxtiosInstance().patch(uri, body)
      .then(result => resolve(result.data))
      .catch(error => {
        console.error(error)
        reject(error)
    })

  })
}