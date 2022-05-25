import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const service = axios.create({
    baseURL: 'https://uc.runfast123.com',
    timeout: 60000
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
    return config
})

service.interceptors.response.use((res: AxiosResponse) => {
    if (res.data.code !== 200) {
        return Promise.reject(res)
    }
    return res
}, (err: AxiosError) => {
    console.log(err)
    return Promise.reject(err)
})

export default service