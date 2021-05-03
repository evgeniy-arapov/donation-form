import axios from 'axios'
const portString = process.env.API_PORT && ':' + process.env.API_PORT
const baseApiUrl = `//${process.env.API_DOMAIN}${portString}${process.env.API_PATH}`

const apiClient = axios.create({
  timeout: 100000,
  baseURL: baseApiUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  maxContentLength: 10000
})

export default apiClient
