import axios from 'axios'

const instance = axios.create({
  /* baseURL: 'https://podcast-web-application.onrender.com' */
  baseURL: 'http://localhost:9999/'
})

export default instance