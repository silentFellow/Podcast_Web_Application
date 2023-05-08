import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://podcast-web-application.onrender.com'
})

export default instance