import http from '~~/utils/http';

// 获取我的用户信息
export const getMeUserInfo = () => http.get(`/auth`);

// 获取别人用户信息
export const getOhterUserInfo = (id: number) => http.get(`/user/${id}`);

// 登录
export const login = (body: { account: string; password: string }) =>
  http.post('/auth/login', body);

// 退出登录
export const loginOut = () => http.get(`/auth/loginOut`);

// 获取用户文章列表
export const getArticle = (id: number, params: { limit: number; page: number }) =>
  http.get(`/user/article/${id}`, params);

// 获取用户收藏
export const getUserCollect = (id: string) => http.get(`/collect/list/${id}`);

// 获取用户点赞
export const getUserLike = (id: string) => http.get(`/like/list/${id}`);

// 获取用户关注
export const getUserFollow = (id: string, params: object) => http.get(`/user/follow/${id}`, params);

// 关注用户
export const postFollow = (body: object) => http.post('/follow', body);

// 取消关注用户
export const deleteFollow = (id: string) => http.delete(`/follow/${id}`);

// 签到
export const sign = () => http.get(`/sign`);

// 签到记录
export const getSignRecord = (params: object) => http.get(`/sign/record`, params);

// 签到信息
export const getSignInfo = () => http.get(`/sign/signInfo`);
