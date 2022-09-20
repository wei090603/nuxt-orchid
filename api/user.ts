import http from '~~/utils/http';

// 获取文章详情
export const getUserInfo = (id: number) =>
  http.get('userGet', `/user/${id}`, {
    lazy: true,
  });

export const login = (body: { account: string; password: string }) => {
  // return http.post('/auth/login', body);
};

// export const userInfo = () => http.get('/auth');
