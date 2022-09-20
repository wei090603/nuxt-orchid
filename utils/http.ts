import { Ref } from 'nuxt/dist/app/compat/capi';

import { c, createDiscreteApi } from 'naive-ui';

type AsyncData<DataT> = {
  data: Ref<DataT>;
  pending: Ref<boolean>;
  refresh: () => Promise<void>;
  execute?: () => Promise<void>;
  error: Ref<Error | boolean>;
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
    lazy: false,
    key: key,
    $: false,
    headers: {
      Authorization: `Bearer ${token.value} || ''`,
    },
    ...options,
  };

  // console.log(option, 'option' + url);

  if (options.$) {
    const data = ref(null);
    const error = ref(null);
    return await $fetch(url, option)
      .then((res: { data: object }) => {
        data.value = res.data;
        return {
          data,
          error,
        };
      })
      .catch((err) => {
        const msg = err?.data?.data;
        if (process.client) {
          const { message } = createDiscreteApi(['message']);
          message.error(msg || '服务端错误');
        }
        error.value = msg;
        return {
          data,
          error,
        };
      });
  }

  const { data, pending, error, refresh }: AsyncData<any> = await useFetch(
    url,
    {
      ...option,
      // 相当于响应拦截器
      transform: (res: { data: object }) => {
        return res.data;
      },
    }
  );

  // 客户端错误处理
  if (process.client && error.value) {
    const msg = error.value?.data?.data;
    if (!options.lazy) {
      const { message } = createDiscreteApi(['message']);
      message.error(msg || '服务端错误');
      return;
    }
  }

  return { data, pending, refresh };
}

class Http {
  get(key: string, url: string, params?: object): Promise<any> {
    return fetch(key, url, { method: 'get', ...params });
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
