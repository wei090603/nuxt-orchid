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

// 获取用户收藏
export const getUserCollect = (id: string) => http.get('userCollect', `/user/collect/${id}`);

// 获取用户点赞
export const getUserLike = (id: string) => http.get('userLike', `/user/like/${id}`);

// 获取用户关注
export const getUserFollow = (id: string, params: object) =>
  http.get('userFollow', `/user/follow/${id}`, params);

// 关注用户
export const postFollow = (body: object) => http.post('postFollow', '/follow', body);

// 取消关注用户
export const deleteFollow = (id: string) => http.delete('deleteFollow', `/follow/${id}`);

// 签到
export const sign = () => http.get('sign', `/sign`);

// 签到记录
export const signRecord = (params: object) => http.get('signRecord', `/sign/record`, params);
