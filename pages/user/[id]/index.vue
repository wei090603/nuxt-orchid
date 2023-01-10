<template>
  <div class="wrapper">
    <LoadingGroup :pending="pending" :error="error" :isEmpty="data.length === 0">
      <div class="dynamic-container">
        <template v-for="item in data.list" :key="item.id">
          <div class="dynamic-item" v-if="item.type === 1 || item.type === 2">
            <div class="source-header">
              <span class="username">{{ item.user.nickName }}</span>
              {{ item.type === 1 ? '发表' : '赞' }}了这篇文章
            </div>

            <div class="content-wrapper">
              <div class="article-header">
                <div class="author-info author-bar">
                  <div class="popover-box user-popover">
                    <nuxt-link :to="{ path: `/user/${item.article.author.id}` }" target="_blank">
                      <img
                        :src="imgUrl + item.article.author.avatar"
                        class="lazy avatar"
                        loading="lazy"
                      />
                    </nuxt-link>
                  </div>
                  <div class="author-info-content">
                    <div class="author-info-head">
                      <div class="popover-box user-popover">
                        <nuxt-link
                          :to="{ path: `/user/${item.article.author.id}` }"
                          target="_blank"
                          class="username"
                        >
                          {{ item.article.author.nickName }}
                        </nuxt-link>
                      </div>
                    </div>
                    <div class="meta-box">
                      <div class="position ellipsis">
                        {{ item.article.author.signText }}
                      </div>
                      <div class="dot">·</div>
                      {{ dayjs(item.createdAt).locale('zh-cn').from(dayjs()) }}
                    </div>
                  </div>
                  <n-button class="btn" type="primary" ghost>关注</n-button>
                </div>
              </div>
              <div class="post-item-content">
                <nuxt-link
                  :to="{ path: `/article/${item.article.id}` }"
                  target="_blank"
                  class="post-link"
                >
                  <div class="post-item-title">
                    <h3>{{ item.article.title }}</h3>
                  </div>
                  <div class="rich-content">
                    <div class="post-item-excerpt">{{ item.article.summary }}</div>
                  </div>
                </nuxt-link>
              </div>
            </div>

            <div class="action-box post-item-actions">
              <div class="action like-action">
                <div class="action-title-box">
                  <i class="iconfont icon-dianzan1" v-if="item.article.isLike"></i>
                  <i class="iconfont icon-dianzan" v-else></i>
                  <span class="action-title">{{ item.article.likeCount }}</span>
                </div>
              </div>
              <div class="action comment-action">
                <div class="action-title-box">
                  <i class="iconfont icon-pinglun1"></i>
                  <span class="action-title">{{ item.article.commentCount }}</span>
                </div>
              </div>
              <div class="action share-action">
                <div class="action-title-box">
                  <i class="iconfont icon-shoucangfill" v-if="item.article.isCollect"></i>
                  <i class="iconfont icon-shoucang" v-else></i>
                  <span class="action-title">收藏</span>
                </div>
              </div>
            </div>
          </div>

          <div class="dynamic-item" v-if="item.type === 3">
            <div class="action-item content-item">
              <div class="author-info">
                <div class="popover-box user-popover">
                  <img
                    :src="imgUrl + item.user.avatar"
                    alt=""
                    class="lazy avatar avatar"
                    loading="lazy"
                  />
                </div>
                <div class="author-info-content">
                  <div class="author-info-head">
                    <div class="popover-box user-popover author-info-item">
                      <span class="username">{{ item.user.nickName }}</span>
                    </div>
                    <span>关注了</span>
                    <div class="popover-box user-popover author-info-item">
                      <nuxt-link
                        :to="{ path: `/user/${item.follow.id}` }"
                        target="_blank"
                        class="username"
                      >
                        {{ item.follow.nickName }}
                      </nuxt-link>
                    </div>
                  </div>
                  <div class="meta-box">
                    <div class="position ellipsis">{{ item.user.signText }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </LoadingGroup>
  </div>
</template>

<script lang="ts" setup>
import { getDynamic } from '~~/api/user';

import dayjs from 'dayjs';
//导相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime';
//导国际化插件i18n
import 'dayjs/locale/zh-cn';
dayjs.extend(relativeTime);

const route = useRoute();

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;

const id = route.params.id as string;

const { pending, data, error } = await getDynamic(Number(id), { page: 1, limit: 10 });
</script>

<style lang="less" scoped>
.dynamic-item {
  width: auto;
  height: auto;
  background-color: #fff;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 0.2rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  .source-header {
    padding: 0 20px;
    display: flex;
    height: 43px;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    font-size: 13px;
    color: #8a9aa9;
    box-sizing: border-box;
    .username {
      margin: 0 4px;
      font-weight: 500;
      color: #17181a;
    }
  }

  .article-header {
    position: relative;
    padding: 16px 20px 0;
    .author-info {
      display: flex;
      align-items: center;
      .avatar {
        flex: 0 0 auto;
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
      .author-info-content {
        margin-left: 15px;
        font-size: 15px;
        color: #8a9aa9;
        .meta-box {
          display: flex;
          align-items: center;
          margin: 0.3rem 0 0;
          font-size: 13px;
          color: #8a9aa9;
          cursor: default;
        }
      }
      .btn {
        margin: 0 0 0 auto;
      }
    }
  }

  .post-item-content {
    margin-left: 60px;
    padding: 6px 20px 10px;
    .post-link {
      display: block;
      .post-item-title h3 {
        margin: 0;
        display: inline;
        font-size: 17px;
        color: #17181a;
        line-height: 1.5;
      }
      .rich-content {
        margin-top: 3px;
        padding: 3px 0;
        display: flex;
        .post-item-excerpt {
          margin-right: 16px;
          font-size: 15px;
          color: #5c6066;
          line-height: 1.53;
          flex: 1 1 auto;
        }
      }
    }
  }

  .action-box {
    display: flex;
    position: relative;
    margin-top: 3px;
    height: 34px;
    border-top: 1px solid #ebebeb;
    .action {
      flex: 1 1 33.333%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      height: 100%;
      cursor: pointer;
      user-select: none;
      &:not(:last-child):after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -1rem;
        width: 1px;
        height: 2rem;
        background-color: #ebebeb;
      }
      &:not(:last-child):after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -1rem;
        width: 1px;
        height: 2rem;
        background-color: #ebebeb;
      }
    }
  }

  .content-item {
    .author-info {
      padding: 16px 20px;
      display: flex;
      align-items: center;
      .avatar {
        flex: 0 0 auto;
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
      .author-info-content {
        width: calc(100% - 65px);
        margin-left: 1rem;
        font-size: 15px;
        color: #8a9aa9;
        .author-info-head {
          display: flex;
          align-items: center;
          white-space: nowrap;
          span {
            margin: 0 4px;
          }
        }
      }
    }
  }
}
</style>
