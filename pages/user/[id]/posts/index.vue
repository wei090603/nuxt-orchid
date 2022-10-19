<template>
  <div class="wrapper">
    <LoadingGroup :pending="pending" :error="error">
      <div class="article-container">
        <div class="article-item" v-for="item in data" @click="handleGoDetail(item.id)">
          <div class="top">
            {{ item.author.nickName }} | {{ item.createdAt }} | {{ item.category?.title }}
          </div>

          <div class="content-wrapper">
            <div class="content-main">
              <div class="title">{{ item.title }}</div>
              <div class="abstract">{{ item.summary }}</div>
              <div class="bottom">
                <span>
                  <i class="iconfont icon-huo" :class="{ active: item.reading >= 100 }"></i>
                  {{ item.reading }}
                </span>
                <span class="dianzan">
                  <i class="iconfont icon-dianzan" :class="{ active: item.isLike }"></i>
                  {{ item.likeCount }}
                </span>
                <!-- 文章发布时间 -->
                <span>
                  <i class="iconfont icon-shijian"></i>
                  {{ item.commentCount }}
                </span>
              </div>
            </div>
            <img class="thumb" :src="imgUrl + item.coverPicture" alt="" />
          </div>
        </div>
      </div>
    </LoadingGroup>
  </div>
</template>

<script lang="ts" setup>
import { getUserArticle } from '~~/api/user';

const route = useRoute();
const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;

const id = route.params.id as string;

const { pending, data, error } = await getUserArticle(id);

const handleGoDetail = (id: string) => {
  window.open(`/article/${id}`, '_blank');
};
</script>

<style lang="less" scoped>
.article-item {
  cursor: pointer;
  position: relative;
  background: #fff;
  padding: 12px 20px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.3s ease-in;
  &:hover {
    background: #fafafa;
  }
  .content-wrapper {
    display: flex;
    padding-bottom: 12px;
    border-bottom: 1px solid #e5e6eb;
    margin-top: 10px;
    width: 100%;
    .content-main {
      flex: 1 1 auto;
      .title {
        display: flex;
        margin-bottom: 8px;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #1d2129;
        width: 100%;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
      .abstract {
        color: #86909c;
        font-size: 13px;
        line-height: 22px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        margin-bottom: 10px;
      }
    }
    .thumb {
      flex: 0 0 auto;
      width: 120px;
      height: 80px;
      margin-left: 24px;
      background-color: #fff;
      border-radius: 2px;
    }
  }
}
</style>
