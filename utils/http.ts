import { Ref } from 'nuxt/dist/app/compat/capi';

import { createDiscreteApi } from 'naive-ui';

function responseVerify(msg: string) {
  const { message } = createDiscreteApi(['message']);
  message.error(msg);
}

type AsyncData<DataT> = {
  data: Ref<DataT>;
  pending: Ref<boolean>;
  refresh: () => Promise<void>;
  execute?: () => Promise<void>;
  error: Ref<Error | boolean | any>;
};

//http请求封装
async function fetch(key: string, url: string, options: any) {
  const { $config, $router } = useNuxtApp();

  // 用户登录，默认传token
  const token = useCookie('token');

  const option = {
    baseURL: $config.public.VITE_API_URL,
    // server: true,
    initialCache: false,
    key: key,
    headers: {
      Authorization: `Bearer ${token.value} || ''`,
    },
    ...options,
  };

  return new Promise(async (resolve, reject) => {
    const res: AsyncData<any> = await useFetch(url, {
      ...option,
      // 相当于响应拦截器
      transform: (res: { data: object; code: number; message: string }) => {
        if (res?.code !== 200) {
          responseVerify(res.message);
          reject({ code: res.code, message: res.message });
        }
        return res.data;
      },
    });

    // 客户端错误处理
    if (process.client && res.error.value) {
      const msg = res.error.value?.data?.message;
      // if (!options.lazy) {
      if (res.error.value?.data.code === 401) {
        responseVerify('登录失效，请重新登录');
        reject('error');
      }
      responseVerify(msg || '服务端错误');
      reject(res.error.value);
      // }
    }

    resolve(res);
  });
}

class Http {
  get(key: string, url: string, params?: object): Promise<any> {
    return fetch(key, url, { method: 'get', params });
  }

  post(key: string, url: string, body?: any): Promise<any> {
    return fetch(key, url, { method: 'post', body });
  }

  put(key: string, url: string, body?: any): Promise<any> {
    return fetch(key, url, { method: 'put', body });
  }

  delete(key: string, url: string): Promise<any> {
    return fetch(key, url, { method: 'delete' });
  }
}

export default new Http();
