<template>
  <div class="list">
    <!-- 列表 -->
    <ul>
      <li v-for="item in articleData.list" :key="item.id">
        <div class="item" @click="handleToDetail(item.id)">
          <div class="left">
            <img :src="imgUrl + item.coverPicture" alt="" />
            <span class="tags_blue">{{ item.category?.title }}</span>
          </div>

          <div class="right">
            <h2>{{ item.title }}</h2>
            <p class="summary">{{ item.summary }}</p>

            <div class="meta">
              <div class="author" @click.stop="handleGoUserDetail(item.author?.id)">
                <img :src="imgUrl + item.author?.avatar" alt="" />
                <span>{{ item.author?.nickName }}</span>
              </div>

              <div class="interact">
                <span @click.stop="handleLikeClick(item)" class="dianzan">
                  <i class="iconfont icon-dianzan" :class="{ active: item.isLike }"></i>
                  {{ item.likeCount }}
                </span>
                <span>
                  <i class="iconfont icon-remen" :class="{ active: item.reading >= 100 }"></i>
                  {{ item.reading }}
                </span>
                <span>
                  <i class="iconfont icon-shijian"></i>
                  {{ dayjs(item.createdAt).format('YYYY-MM-DD') }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="not-data" v-if="articleData.finished">{{ articleData.finishedText }}</div>
  </div>
</template>

<script lang="ts" setup>
import { getArticle, articleLike, articleLikeDel } from '@/api/article';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // 导入本地化语言
dayjs.locale('zh-cn'); // 使用本地化语言

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;

const articleData = reactive<any>({
  list: [],
  total: 0,
  page: 1,
  loading: false,
  finished: false,
  finishedText: '没有更多了',
});

const getArticleList = async () => {
  articleData.loading = true;
  if (articleData.finished) return false;
  const { data } = await getArticle({ page: articleData.page, size: 10 });
  articleData.total = data.value.total;
  articleData.list = articleData.list.concat(data.value.list);
  articleData.page += 1;
  articleData.loading = false;
  if (articleData.list.length >= articleData.total) {
    articleData.finished = true;
  }
};

await getArticleList();

const handleToDetail = (id: string) => {
  window.open(`/article/${id}`, '_blank');
};

const handleGoUserDetail = (id: string) => {
  window.open(`/user/${id}`, '_blank');
};

// 文章点赞
const handleLikeClick = async (item: { isLike: number; likeCount: number; id: number }) => {
  if (item.isLike) {
    try {
      await articleLikeDel(item.id);
      item.isLike = 0;
      item.likeCount -= 1;
    } catch (_error) {}
  } else {
    try {
      await articleLike({ articleId: item.id });
      item.isLike = 1;
      item.likeCount += 1;
    } catch (_error) {}
  }
};

onMounted(() => {
  window.onscroll = async function () {
    //变量scrollTop是滚动条滚动时，距离顶部的距离
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //变量windowHeight是可视区的高度
    const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //变量scrollHeight是滚动条的总高度
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    //滚动条到底部的条件
    if (scrollTop + windowHeight == scrollHeight) {
      //写后台加载数据的函数
      await getArticleList();
    }
  };
});
</script>

<style lang="less" scoped>
.list {
  overflow: hidden;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(26 26 26 / 20%);
  transition: all 0.3s;
  ul li {
    position: relative;
    width: 100%;
    height: 160px;
    padding: 0 15px;
    background-color: #fff;
    transition: all 0.3s;
    &::after {
      content: '';
      position: absolute;
      left: 0px;
      width: 5px;
      height: 0px;
      border-radius: 3px;
      background-color: var(--Yuexing-color);
      transition: all 0.3s;
      top: 20px;
    }
    &:hover::after {
      height: 30px;
    }
    &:hover .left span {
      right: 10px;
    }
    &:hover {
      background-color: #fafafa;
    }
    .item {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 15px 0;
      border-bottom: 1px solid #ededed;
      cursor: pointer;
    }
    .left {
      overflow: hidden;
      position: relative;
      width: 250px;
      height: 100%;
      border-radius: 3px;
      cursor: pointer;
      &::before {
        content: '';
        position: absolute;
        width: 60px;
        top: -100px;
        left: -70px;
        height: 200%;
        background: linear-gradient(to right, rgba(255, 255, 255, 0.2), transparent);
        transform: rotate(40deg);
        cursor: pointer;
      }
      span {
        position: absolute;
        top: 10px;
        right: -70px;
        transition: all 0.4s;
        font-size: 12px;
      }
      a {
        display: block;
        height: 100%;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
      .tags_blue {
        background-color: var(--Yuexing-color);
        padding: 4px;
        color: #fff;
        border-radius: 3px;
        font-size: 14px;
        font-family: '黑体';
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20px;
      height: 100%;
      h2 {
        width: 100%;
        font-size: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 3px;
      }
      p {
        flex: 1;
        color: var(--Yuexing-a-vice) !important;
        font-size: 14px;
        transition: all 0.3s;
        /* 多行文本溢出省略号显示 */
        display: -webkit-box !important;
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
      .meta {
        display: flex;
        justify-content: space-between;
        .author {
          font-size: 14px;
          &:hover {
            color: #1abc9c;
          }
          img {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            vertical-align: bottom;
            margin-right: 5px;
          }
        }
        .interact {
          span {
            margin: 0 14px;
            i {
              margin-right: 3px;
              color: #ededed;
              &.icon-dianzan {
                cursor: pointer;
                &.active {
                  color: var(--Yuexing-color);
                }
              }
              &.icon-huo.active {
                color: red;
              }
            }
            &.dianzan {
              &:hover {
                .icon-dianzan {
                  color: var(--Yuexing-color);
                }
              }
            }
          }
        }
      }
    }
    &:last-child {
      border: 0;
    }
  }
  .not-data {
    width: 100%;
    text-align: center;
    padding: 15px 0;
    color: #ccc;
    font-size: 16px;
  }
}

/* 鼠标经过图片动画 */
@keyframes imgMove {
  0% {
    left: -70px;
  }

  100% {
    left: 340px;
  }
}
</style>
