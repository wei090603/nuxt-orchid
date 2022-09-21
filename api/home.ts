import http from '~~/utils/http';

// 获取广告位
export const getAdvertise = (params: { position: string }) =>
  http.get('advertise', `/advertise`, {
    lazy: true,
    params,
  });

// 获取右侧标签
export const getHotTag = () =>
  http.get('tag', `/tag/hot`, {
    lazy: true,
  });

// 获取热门文章
export const getArticleHot = () =>
  http.get('tag', `article/hot`, {
    lazy: true,
  });
