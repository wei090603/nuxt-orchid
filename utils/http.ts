import { createDiscreteApi } from 'naive-ui';
import { Ref } from 'nuxt/dist/app/compat/capi';
import { hash } from 'ohash';

function responseVerify(code: number, msg?: string) {
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
    case 404:
      message.error(msg || '你所访问的资源不存在！');
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
      message.error(msg || '请求失败！');
  }
}

type AsyncData<DataT> = {
  data: Ref<DataT>;
  pending: Ref<boolean>;
  refresh: () => Promise<void>;
  execute?: () => Promise<void>;
  error: Ref<Error | boolean | any>;
};

// 后端返回的数据类型
export interface ResOptions<T> {
  data?: T;
  code: number;
  message: string;
}

const fetch = (url: string, options?: any): Promise<any> => {
  // 用户登录，默认传token
  const token = useCookie('token');
  const {
    public: { VITE_API_URL },
  } = useRuntimeConfig(); // 3.0正式版环境变量要从useRuntimeConfig里的public拿

  // 不设置key，始终拿到的都是第一个请求的值，参数一样则不会进行第二次请求
  const key = hash(JSON.stringify(options) + url);

  const option = {
    // baseURL: VITE_API_URL,
    headers: {
      Authorization: `Bearer ${token.value || ''}`,
    },
    ...options,
  };

  return new Promise((resolve, reject) => {
    useFetch(VITE_API_URL + url, {
      ...option,
      key,
      transform: (res: ResOptions<any>) => {
        // console.log(res, 'res');
        if (res?.code !== 200) {
          responseVerify(res.code, res.message);
          reject({ code: res.code, message: res.message });
        }
        return res.data;
      },
    })
      .then((res: AsyncData<any>) => {
        if (res.error.value) {
          const data = res.error.value?.data;
          if (data?.code === 401) {
            token.value = '';
            responseVerify(401);
            reject(res.error.value);
          }
          return;
        }
        // console.log(data.value, 'data');
        // // console.log('useFetchResData: ', value);
        // if (value.code !== 200) {
        //   responseVerify(value.code);
        //   return;
        // } else {
        //   console.log(value, 'data');
        //   resolve(value.data);
        // }
        resolve(res);
      })
      .catch((err: any) => {
        console.log(err);
        reject(err);
      });
  });
};

class Http {
  get(url: string, params?: object): Promise<any> {
    return fetch(url, { method: 'get', params });
  }

  post(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'post', body });
  }

  put(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'put', body });
  }

  delete(url: string): Promise<any> {
    return fetch(url, { method: 'delete' });
  }
}

export default new Http();
