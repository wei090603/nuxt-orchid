import http from '~~/utils/http';

// 获取文章列表
export const getArticle = (params: { limit: number; page: number }) => http.get(`/article`, params);

// 获取用户文章列表
export const getUserArticle = (params: { limit: number; page: number; userId: number }) =>
  http.get(`/article/user`, params);

// 获取文章详情
export const getArticleDetail = (id: number) => http.get(`/article/${id}`);

// 获取评论列表
export const getCommentList = (id: string) => http.get(`/comment/article/${id}`);

// 提交评论
export const createComment = (params: object) => http.post('/comment', params);

// 提交评论
export const createSubComment = (params: object) => http.post('/comment/sub', params);

// 文章点赞
export const articleLike = (params: object) => http.post('/like', params);

// 文章取消点赞
export const articleLikeDel = (id: number) => http.delete(`/like/${id}`);

// 获取文章一级分类
export const getCategoryTop = () => http.get(`/category/top`);

// 获取文章树形分类
export const getCategory = () => http.get(`/category`);

// 文章收藏
export const articleCollect = (params: object) => http.post('/collect', params);

// 文章取消收藏
export const articleCollectDel = (id: number) => http.delete(`/collect/${id}`);

// 获取标签
export const getTag = (name: string) => http.get(`/tag/?name=${name}`);

// 发布文章
export const addArticle = (params: object) => http.post('/article', params);
