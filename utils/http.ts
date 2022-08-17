// 指定后端返回的基本数据类型
export interface ResponseConfig {
  code: number,
  status: number,
  data: any,
  msg: string
}
export interface ValueConfig {
  value: any,
  [x: string]: any,
}

const fetch = (url: string, options?: any): Promise<any> => {
  const { $config, $router } = useNuxtApp()
  const reqUrl = $config.public.VITE_API_URL + url

  return new Promise((resolve, reject) => {
    useFetch(reqUrl, { ...options }).then(({ data, error }: any) => {
      if (error.value) {
        reject(error.value)
        return
      }
      const value = data.value
      const result = value && value.data
      if (!result || value.code !== 200) {
        // 这里处理错误回调
        resolve(ref<any>(result))
        $router.replace('/reject/' + value.status)
      } else {
        // resolve(ref<any>(options.method === 'get' ? result : value.data))
        resolve(ref<any>(result))
      }
    }).catch((err: any) => {
      console.log(err)
      reject(err)
    })
  })
}

class Http {

  get(url: string, params?: any): Promise<any> {
    return fetch(url, { method: 'get', params })
  }

  post(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'post', body })
  }

  put(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'put', body })
  }

  delete(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'delete', body })
  }
}

export default new Http()