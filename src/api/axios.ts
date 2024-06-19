import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.openf1.org/v1/',
})
