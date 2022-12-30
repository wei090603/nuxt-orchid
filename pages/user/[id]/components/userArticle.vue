<template>
  <div class="article-item" @click="handleGoDetail(item.id)">
    <div class="top">
      {{ item.author.nickName }} | {{ dayjs(item.createdAt).format('YYYY-MM-DD') }} |
      {{ item.category?.title }}
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
            <i class="iconfont icon-dianzan active"></i>
            {{ item.likeCount }}
          </span>
          <span>
            <i class="iconfont icon-shijian"></i>
            {{ item.commentCount }}
          </span>
        </div>
      </div>
      <img class="thumb" :src="imgUrl + item.coverPicture" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // 导入本地化语言
dayjs.locale('zh-cn'); // 使用本地化语言

interface IArticleItem {
  id: number;
  title: string;
  content: string;
  image: string[];
  coverPicture: string;
  categoryId: number;
  status: number;
  type: number;
  tag: string[];
  author: any;
  likeCount: number;
  commentCount: number;
  reading: number;
  summary: string;
  createdAt: string;
  category: any;
}

interface IPorps {
  item: IArticleItem;
}

const props = withDefaults(defineProps<IPorps>(), {});

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;

const handleGoDetail = (id: number) => {
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
  &:last-child {
    .content-wrapper {
      border-bottom: none;
    }
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
