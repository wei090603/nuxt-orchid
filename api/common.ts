import http from '@/utils/http';

// 获取导航栏列表
export const getNavgation = () => http.get(`/navgation`);
