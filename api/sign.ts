import http from '~~/utils/http';

// 最新签到列表
export const getSignNew = () => http.get(`/sign/new`);

// 今日最快签到列表
export const getSignToday = () => http.get(`/sign/today`);

// 总榜签到列表
export const getSignRank = () => http.get(`/sign/rank`);
