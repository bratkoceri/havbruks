import Axios from 'axios'

export const httpClient = Axios.create({
  baseURL: 'http://localhost:41938/hblapi/',
  headers: {
    'Content-Type': 'application/json',
  },
})
