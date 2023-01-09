<template>
  <div class="wrapper">
    <div class="main">
      <div class="left-container">
        <div class="content-top">
          <h2 class="title">{{ articleDetail.title }}</h2>
          <div class="author-block">
            <nuxt-link target="_blank" :to="{ path: `/user/${articleDetail.author.id}` }">
              <img class="avatar" :src="imgUrl + articleDetail.author.avatar" alt="" />
            </nuxt-link>
            <div class="author-info-box">
              <div class="nickname">
                <nuxt-link target="_blank" :to="{ path: `/user/${articleDetail.author.id}` }">
                  {{ articleDetail.author.nickName }}
                </nuxt-link>
              </div>
              <div class="date">
                {{ articleDetail.createdAt }} · 阅读 {{ articleDetail.reading }}
              </div>
            </div>
          </div>
          <div class="content" v-html="articleDetail.content"></div>
          <div class="article-end-box">
            <div class="category">
              <span>分类:</span>
              <n-button tertiary>{{ articleDetail.category.title }}</n-button>
            </div>
            <div class="tag">
              <span>标签:</span>
              <n-space>
                <n-button
                  strong
                  secondary
                  type="primary"
                  v-for="item in articleDetail.tag"
                  :key="item.id"
                >
                  {{ item.name }}
                </n-button>
              </n-space>
            </div>
          </div>
        </div>

        <ArticleComment></ArticleComment>
        <ArticlePartMor></ArticlePartMor>
      </div>
      <ArticleRightContainer :userId="articleDetail.author.id"></ArticleRightContainer>

      <div class="article-suspended-panel">
        <div
          @click="handleLikeClick(articleDetail.isLike, +id)"
          class="panel-btn with-badge"
          :class="{ active: articleDetail.isLike }"
          :badge="articleDetail.likeCount"
        >
          <i class="iconfont icon-dianzan1" v-if="articleDetail.isLike"></i>
          <i class="iconfont icon-dianzan" v-else></i>
        </div>

        <div class="panel-btn with-badge" :badge="articleDetail.commentCount">
          <i class="iconfont icon-pinglun"></i>
        </div>

        <div
          class="panel-btn"
          :class="{ active: articleDetail.isCollect }"
          @click="handleCollectClick(articleDetail.isCollect, +id)"
        >
          <i class="iconfont icon-shoucangfill" v-if="articleDetail.isCollect"></i>
          <i class="iconfont icon-shoucang" v-else></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getArticleDetail } from '@/api/article';

import useArticleOperation from '~~/composables/useArticleOperation';

const route = useRoute();

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;

const id = route.params.id as string;

const { data: articleDetail } = await getArticleDetail(+id);

const handleAfterLike = (status: boolean) => {
  status ? (articleDetail.value.likeCount -= 1) : (articleDetail.value.likeCount += 1);
  articleDetail.value.isLike = !articleDetail.value.isLike;
};

const handleAfterCollect = () => {
  articleDetail.value.isCollect = !articleDetail.value.isCollect;
};

const { handleCollectClick, handleLikeClick } = useArticleOperation({
  afterLike: handleAfterLike,
  afterCollect: handleAfterCollect,
});

useHead({ title: articleDetail.value.title || '' });
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  padding-top: 80px;
}

.main {
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 20px;
}

.article-suspended-panel {
  position: fixed;
  top: 140px;
  margin-right: -2rem;
  left: 200px;
  z-index: 2;
  .panel-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 1.667rem;
    width: 4rem;
    height: 4rem;
    background-color: #fff;
    background-position: 50%;
    background-repeat: no-repeat;
    border-radius: 50%;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 4%);
    cursor: pointer;
    text-align: center;
    font-size: 1rem;
    color: #4e5969;
    i {
      font-size: 30px;
    }
    &.active {
      color: var(--Yuexing-color);
    }
    &.with-badge::after {
      content: attr(badge);
      position: absolute;
      top: 0;
      left: 75%;
      height: 17px;
      line-height: 17px;
      padding: 0 5px;
      border-radius: 9px;
      font-size: 11px;
      text-align: center;
      white-space: nowrap;
      background-color: #c2c8d1;
      color: #fff;
    }
    &.with-badge.active::after {
      background-color: var(--Yuexing-color);
    }
  }
}

.left-container {
  flex: 1;
  .content-top {
    padding: 20px;
    background: #fff;
    .title {
      margin-bottom: 15px;
      font-size: 20px;
      font-weight: 600;
      color: #252933;
    }
    .author-block {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .avatar {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      .author-info-box {
        flex: 1;
        .nickname {
          color: #515767;
          font-size: 16px;
        }
        .date {
          color: #8a919f;
        }
      }
    }
    .content {
      margin-bottom: 20px;
    }
    .article-end-box {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .category {
        margin-right: 20px;
        span {
          font-size: 14px;
          margin-right: 10px;
        }
      }
      .tag {
        display: flex;
        align-items: center;
        span {
          font-size: 14px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
