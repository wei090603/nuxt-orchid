import http from '~~/utils/http'
/**
 * 获取标签
 */
export const getTags = (params?: { size?: number, page?: number }) => {
  return http.get('/app/v1/tags', params)
}


export const login = (body: { account: string, password: string }) => {
  return http.post('/auth/login', body)
}

export const userInfo = () => http.get('/auth')


export const advertise = (params: { position: string }) => {
  return http.get('/advertise', params)
}

export const navgation = () => http.get('/navgation')



