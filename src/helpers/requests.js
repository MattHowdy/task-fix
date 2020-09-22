import axios from 'axios'


function getAxtiosInstance() {
    return axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      timeout: 60000
    });
}
  

export const get = function get(uri, params) {
    return new Promise((resolve, reject) => {
        
      getAxtiosInstance().get(uri, {
        params: params
      }).then(result => {
        resolve(result.data)
      }).catch(error => {
        console.error(error)
        reject(error)
      })
    })
  }


export const post = function post(uri, body){

return new Promise((resolve, reject) => {
    getAxtiosInstance().post(uri, body).then(result => {
    resolve(result.data)
    }).catch(error => {
    console.error(error)
    reject(error)
    })

})
}