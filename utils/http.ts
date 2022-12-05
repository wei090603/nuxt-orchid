import { createDiscreteApi } from 'naive-ui';
import { Ref } from 'nuxt/dist/app/compat/capi';

function responseVerify(code: number) {
  const { message } = createDiscreteApi(['message']);
  switch (code) {
    case 10400:
      message.error('请求失败！请您稍后重试');
      break;
    case 401:
      message.error('登录失效！请您重新登录');
      location.href = '/';
      break;
    case 403:
      message.error('当前账号无权限访问！');
      break;
    case 10404:
      message.error('你所访问的资源不存在！');
      break;
    case 405:
      message.error('请求方式错误！请您稍后重试');
      break;
    case 408:
      message.error('请求超时！请您稍后重试');
      break;
    case 500:
      message.error('服务异常！');
      break;
    case 502:
      message.error('网关错误！');
      break;
    case 503:
      message.error('服务不可用！');
      break;
    case 504:
      message.error('网关超时！');
      break;
    default:
      message.error('请求失败！');
  }
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
  // const { $config, $router } = useNuxtApp();

  // 用户登录，默认传token
  const token = useCookie('token');

  const option = {
    baseURL: 'http://127.0.0.1:4000',
    // server: true,
    initialCache: false,
    key: key,
    headers: {
      Authorization: `Bearer ${token.value} || ''`,
    },
    ...options,
  };

  if (options?.params?.$) {
    return await $fetch(url, option)
      .then((res) => {
        if (res?.code !== 200) {
          responseVerify(res.code);
        }
        return res;
      })
      .catch((err) => {
        const data = err.value?.data;
        if (process.client) {
          if (data?.code === 401) {
            token.value = '';
            responseVerify(401);
            return;
          }
          responseVerify(500);
        }
      });
  }

  return new Promise(async (resolve, reject) => {
    const res: AsyncData<any> = await useFetch(url, {
      ...option,
      // 相当于响应拦截器
      transform: (res: { data: object; code: number; message: string }) => {
        if (res?.code !== 200) {
          responseVerify(res.code);
          reject({ code: res.code, message: res.message });
        }
        return res.data;
      },
    });

    // 客户端错误处理
    if (process.client && res.error.value) {
      const data = res.error.value?.data;
      // if (!options.lazy) {
      if (data?.code === 401) {
        token.value = '';
        responseVerify(401);
        reject('error');
      }
      responseVerify(500);
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
