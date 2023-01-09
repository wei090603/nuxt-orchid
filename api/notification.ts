import http from '~~/utils/http';

// 点赞消息列表
export const getLikeMsg = (params: { limit: number; page: number }) =>
  http.get(`/message/list/like`, params);

// 关注消息列表
export const getFollowMsg = (params: { limit: number; page: number }) =>
  http.get(`/message/list/follow`, params);

// 评论消息列表
export const getCommentMsg = (params: { limit: number; page: number }) =>
  http.get(`/message/list/comment`, params);

// 系统消息列表
export const getSystemMsg = (params: { limit: number; page: number }) =>
  http.get(`/message/list/system`, params);
