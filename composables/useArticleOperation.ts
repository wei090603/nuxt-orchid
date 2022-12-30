interface ResponseState {
  handleLikeClick: (status: boolean, id: number) => void;
  handleCollectClick: (status: boolean, id: number) => void;
}

interface IUseParams {
  afterLike: (status: boolean, id?: number) => void;
  afterCollect: (status: boolean, id?: number) => void;
}

import { articleCollect, articleCollectDel, articleLike, articleLikeDel } from '@/api/article';

function useArticleOperation({ afterLike, afterCollect }: IUseParams): ResponseState {
  // 文章点赞
  const handleLikeClick = async (status: boolean, id: number) => {
    status ? await articleLikeDel(id) : await articleLike({ articleId: id });
    afterLike?.(status, id);
  };

  // 收藏
  const handleCollectClick = async (status: boolean, id: number) => {
    status ? await articleCollectDel(id) : await articleCollect({ articleId: id });
    afterCollect?.(status, id);
  };

  return { handleLikeClick, handleCollectClick };
}

export default useArticleOperation;
