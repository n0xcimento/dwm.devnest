import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.10.112:19000'
    
})

export default api;