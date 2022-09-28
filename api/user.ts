import http from '~~/utils/http';

// 获取我的用户信息
export const getMeUserInfo = () => http.get('meUser', `/auth`, { $: true });

// 获取别人用户信息
export const getOhterUserInfo = (id: string) => http.get('otherUser', `/user/${id}`);

// 登录
export const login = (body: { account: string; password: string }) =>
  http.post('login', '/auth/login', body);

// 退出登录
export const loginOut = () => http.get('loginOut', `/auth/loginOut`);

// 获取用户文章
export const getUserArticle = (id: string) => http.get('userArticle', `/user/article/${id}`);
