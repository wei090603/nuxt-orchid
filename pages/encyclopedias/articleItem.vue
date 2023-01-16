<template>
  <div class="article-item">
    <div class="top">
      <nuxt-link class="user-message" :to="{ path: `/user/${item.author.id}` }">
        {{ item.author?.nickName }}
      </nuxt-link>
      <span class="date">
        {{ dayjs(item.createdAt).locale('zh-cn').from(dayjs()) }}
      </span>
      <div class="tag-list">
        <span class="category">
          {{ item.category?.title }}
        </span>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="content-main">
        <div class="title">
          <nuxt-link :to="{ path: `/encyclopedias/${item.id}` }" target="_blank">
            {{ item.title }}
          </nuxt-link>
        </div>
        <div class="abstract">
          <nuxt-link :to="{ path: `/encyclopedias/${item.id}` }" target="_blank">
            {{ item.summary }}
          </nuxt-link>
        </div>
        <div class="bottom">
          <ul class="interact">
            <li class="item">
              <i class="iconfont icon-liulan"></i>
              <span>{{ item.reading }}</span>
            </li>
          </ul>
        </div>
      </div>
      <img class="thumb" :src="item.coverPicture" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
//导相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime';
//导国际化插件i18n
import 'dayjs/locale/zh-cn';
dayjs.extend(relativeTime);

interface IArticleItem {
  id: number;
  title: string;
  content: string;
  coverPicture: string;
  author: any;
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
  window.open(``, '_blank');
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
  .top {
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
    .tag-list {
      display: flex;
      align-items: center;
      margin-left: 8px;
      color: #86909c;
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
      .bottom {
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
