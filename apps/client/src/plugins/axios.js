import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
})

instance.interceptors.request.use(function (config) {
  let getAuthToken = () => localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${getAuthToken()}`
  config.headers['Content-Type'] = 'application/json'
  return config
})

export default instance
