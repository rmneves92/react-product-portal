import axios from 'axios'
import Cookies from 'js-cookie'

export const getToken = () => Cookies.get('token')

export const api = axios.create({
  baseURL: 'https://6256fc506ea7037005434e84.mockapi.io/api',
  headers: {
    Authorization: getToken()
  }
})
