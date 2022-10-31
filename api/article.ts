import http from '~~/utils/http';

// 获取文章列表
export const getArticle = (params: { size: number; page: number }) =>
  http.get('getArticle', `/article`, { ...params, initialcache: false });

// 获取文章详情
export const getArticleDetail = (id: string) => http.get('getArticleDetail', `/article/${id}`);

// 获取评论列表
export const getCommentList = (id: string) => http.get('commentArticle', `/comment/article/${id}`);

// 提交评论
export const createComment = (body: object) => http.post('createComment', '/comment', body);

// 文章点赞
export const articleLike = (body: object) => http.post('articleLike', '/article/like', body);

// 文章取消点赞
export const articleLikeDel = (id: string) => http.delete('articleLikeDel', `/article/like/${id}`);

// 获取文章一级分类
export const getCategoryTop = () => http.get('getCategoryTop', `/category/top`);

// 获取文章树形分类
export const getCategory = () => http.get('getCategory', `/category`);

// 文章收藏
export const articleCollect = (body: object) =>
  http.post('articleCollect', '/collect/addArticle', body);

// 文章取消收藏
export const articleCollectDel = (id: string) =>
  http.delete('articleCollectDel', `/collect/delArticle/${id}`);
