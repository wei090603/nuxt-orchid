import http from '~~/utils/http'
/**
 * 获取标签
 */
export const getArticle = (params?: { size?: number; page?: number }) => {
  return http.get('/article', params)
}
