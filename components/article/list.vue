<template>
  <div class="list">
    <ul class="entry-list-wrap">
      <li class="entry-item" v-for="item in articleData.list" :key="item.id">
        <div class="article-item" @click="handleToDetail(item.id)">
          <div class="left">
            <img :src="imgUrl + item.coverPicture" alt="" />
            <nuxt-link
              class="tags_blue"
              :to="{ path: `/category/${item.category.id}` }"
              target="_blank"
              @click.stop
            >
              {{ item.category?.title }}
            </nuxt-link>
          </div>

          <div class="right">
            <div class="meta-container">
              <nuxt-link
                class="user-message"
                :to="{ path: `/user/${item.author.id}` }"
                target="_blank"
                @click.stop
              >
                {{ item.author?.nickName }}
              </nuxt-link>
              <span class="date">
                {{ dayjs(item.createdAt).locale('zh-cn').from(dayjs()) }}
              </span>
              <nuxt-link
                class="category"
                :to="{ path: `/category/${item.category.id}` }"
                target="_blank"
                @click.stop
              >
                {{ item.category?.title }}
              </nuxt-link>
            </div>
            <h2 class="title">{{ item.title }}</h2>
            <p class="summary">{{ item.summary }}</p>

            <div class="meta">
              <ul class="interact">
                <li class="item">
                  <i class="iconfont icon-liulan"></i>
                  <span>{{ item.reading }}</span>
                </li>
                <li
                  @click.stop="handleLikeClick(item)"
                  class="like item"
                  :class="{ active: item.isLike }"
                >
                  <i class="iconfont icon-dianzan1" v-if="item.isLike"></i>
                  <i class="iconfont icon-dianzan" v-else></i>
                  <span>{{ item.likeCount }}</span>
                </li>
                <li class="item">
                  <i class="iconfont icon-pinglun1"></i>
                  <span>{{ item.commentCount }}</span>
                </li>
              </ul>
              <div class="tag">
                <nuxt-link
                  v-for="tag in item.tag"
                  :to="{ path: `/tag/${tag.id}` }"
                  target="_blank"
                  @click.stop
                >
                  {{ tag.name }}
                </nuxt-link>
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
//导相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime';
//导国际化插件i18n
import 'dayjs/locale/zh-cn';
dayjs.extend(relativeTime);

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
  const { data } = await getArticle({ page: articleData.page, limit: 10 });
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
  flex: 1;
  overflow: hidden;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(26 26 26 / 20%);
  transition: all 0.3s;
  .entry-list-wrap {
    .entry-item {
      position: relative;
      width: 100%;
      height: 140px;
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
      &:hover .left .tags_blue {
        right: 10px;
      }
      &:hover {
        background-color: #fafafa;
      }
      .article-item {
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
        width: 210px;
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
        .tags_blue {
          position: absolute;
          top: 10px;
          right: -70px;
          transition: all 0.4s;
          font-size: 12px;
          background-color: var(--Yuexing-color);
          padding: 4px;
          color: #fff;
          border-radius: 3px;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: fill;
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 20px;
        height: 100%;
        .meta-container {
          display: flex;
          align-items: center;
          color: #86909c;
          .user-message {
            display: flex;
            align-items: center;
            margin-right: 8px;
            max-width: 162px;
            font-size: 13px;
            line-height: 22px;
            color: #4e5969;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
          }
          .date {
            position: relative;
            padding: 0 10px;
            font-size: 13px;
            flex-shrink: 0;
            &::after,
            &::before {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              display: block;
              width: 1px;
              height: 14px;
              background: #e5e6eb;
              content: ' ';
            }
            &::after {
              right: 0;
            }
            &::before {
              left: 0;
            }
          }
          .category {
            margin-left: 8px;
            color: #86909c;
            &:hover {
              color: var(--Yuexing-color);
            }
          }
        }
        h2 {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          margin-right: 3px;
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
        p {
          color: #86909c;
          font-size: 13px;
          line-height: 22px;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
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
            display: flex;
            align-items: center;
            .item {
              display: flex;
              align-items: center;
              position: relative;
              margin-right: 20px;
              font-size: 13px;
              color: #4e5969;
              flex-shrink: 0;
              &.like {
                &.active {
                  color: var(--Yuexing-color);
                }
              }
              i {
                cursor: pointer;
                &.icon-dianzan1 {
                  color: var(--Yuexing-color);
                }
                &:hover {
                  .icon-dianzan {
                    color: var(--Yuexing-color);
                  }
                }
              }
              span {
                margin-left: 4px;
              }
            }
          }
          .tag {
            display: flex;
            align-items: center;
            color: #4e5969;
            a {
              display: flex;
              align-items: center;
              position: relative;
              flex-shrink: 0;
              font-size: 13px;
              padding: 0 8px;
              color: #4e5969;
              &:not(:last-child):after {
                position: absolute;
                right: -1px;
                display: block;
                content: ' ';
                width: 2px;
                height: 2px;
                border-radius: 50%;
                background: #4e5969;
              }
              &:hover {
                color: var(--Yuexing-color);
              }
              &:last-child {
                padding-right: 0;
              }
            }
          }
        }
      }
      &:last-child {
        border: 0;
      }
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
</style>
