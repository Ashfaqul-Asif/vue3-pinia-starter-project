import axios from 'axios'
import { _baseURL } from '../consts'
const $axios = axios.create({ baseURL: _baseURL })

export { $axios }
