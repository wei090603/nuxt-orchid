import http from '@/utils/http';

// 获取百科分类
export const getCategoryList = () => http.get(`/encyclopedias/category`);

// 获取百科文章列表
export const getEncyclopediasList = (params: {
  limit: number;
  page: number;
  categoryId?: number | null;
}) => http.get(`/encyclopedias`, params);

// 文章详情
export const getEncyclopediasDetail = (id: number) => http.get(`/encyclopedias/${id}`);
