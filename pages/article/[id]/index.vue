<template>
  <div class="wrapper">
    <div class="main">
      <div class="left-container">
        <div class="content-top">
          <h2 class="title">{{ data.title }}</h2>
          <div class="author-block">
            <nuxt-link target="_blank" :to="{ path: `/user/${data.author.id}` }">
              <img class="avatar" :src="imgUrl + data.author.avatar" alt="" />
            </nuxt-link>
            <div class="author-info-box">
              <div class="nickname">
                <nuxt-link target="_blank" :to="{ path: `/user/${data.author.id}` }">
                  {{ data.author.nickName }}
                </nuxt-link>
              </div>
              <div class="date">{{ data.createdAt }}· 阅读 {{ data.reading }}</div>
            </div>
            <n-button type="tertiary">关注</n-button>
          </div>
          <div class="content" v-html="data.content"></div>
          <div class="article-end-box">
            <div class="category">
              <span>分类:</span>
              <n-button tertiary>{{ data.category.title }}</n-button>
            </div>
            <div class="tag">
              <span>标签:</span>
              <n-space>
                <n-button strong secondary type="primary" v-for="item in data.tag" :key="item.id">
                  {{ item.name }}
                </n-button>
              </n-space>
            </div>
          </div>
        </div>

        <ArticleComment></ArticleComment>
        <ArticlePartMor></ArticlePartMor>
      </div>
      <ArticleRightContainer :userInfo="userInfo"></ArticleRightContainer>
      <div class="article-suspended-panel">
        <div
          @click="handleLikeClick"
          class="panel-btn with-badge"
          :class="{ active: data.isLike }"
          :badge="data.likeCount"
        >
          <span class="icon">点赞</span>
        </div>
        <div class="panel-btn with-badge" :badge="data.commentCount">
          <span class="icon">评论</span>
        </div>
        <div class="panel-btn" @click="handleCollectClick">
          <span class="icon" v-if="data.isCollect">已收藏</span>
          <span class="icon" v-else>收藏</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NButton, NSpace } from 'naive-ui';
import {
  articleLike,
  articleLikeDel,
  getArticleDetail,
  articleCollect,
  articleCollectDel,
} from '@/api/article';
import { getOhterUserInfo } from '@/api/user';

const route = useRoute();

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;

const id = route.params.id as string;
const userInfo = ref(null);

const { data } = await getArticleDetail(id);

useHead({ title: data.value.title || '' });

const result = await getOhterUserInfo(data.value.author.id);
userInfo.value = result.data.value;

// 文章点赞
const handleLikeClick = async () => {
  if (data.value.isLike) {
    try {
      await articleLikeDel(id);
      data.value.isLike = 0;
      data.value.likeCount -= 1;
    } catch (_error) {
      console.log(_error, 'error');
    }
  } else {
    try {
      await articleLike({ articleId: Number(id) });
      data.value.isLike = 1;
      data.value.likeCount += 1;
    } catch (_error) {}
  }
};

const handleCollectClick = async () => {
  if (data.value.isCollect) {
    try {
      await articleCollectDel(id);
      data.value.isCollect = false;
    } catch (_error) {}
  } else {
    try {
      await articleCollect({ articleId: Number(id) });
      data.value.isCollect = true;
    } catch (_error) {}
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  padding-top: 80px;
}

.main {
  display: flex;
  justify-content: space-between;
  width: 1250px;
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
