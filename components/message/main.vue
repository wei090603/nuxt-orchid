<template>
  <div class="chat-view">
    <ul class="notification-list">
      <li class="item" v-for="item in list" :key="item.id">
        <div class="notification">
          <nuxt-link :href="`/user/${item.user?.id}`" class="" target="_blank">
            <img :src="imgUrl + item.user?.avatar" class="lazy avatar avatar" loading="lazy" />
          </nuxt-link>
          <div class="right">
            <div class="top">
              <div class="content">
                <div class="profile">
                  <nuxt-link :href="`/user/${item.user?.id}`" class="" target="_blank">
                    <span class="name">{{ item.user?.nickName }}</span>
                  </nuxt-link>
                  <span class="title">
                    {{ typeLabel[type] }}
                    <nuxt-link :href="`/article/${item.article?.id}`" target="_blank">
                      <span class="title-article">{{ item.article?.title }}</span>
                    </nuxt-link>
                  </span>
                </div>
                <div class="comment" v-if="type === TypeEnum.COMMENT">{{ item.content }}</div>
                <div class="info" v-else>
                  <span class="time">
                    {{ dayjs(item.createdAt).locale('zh-cn').from(dayjs()) }}
                  </span>
                </div>
              </div>
              <div class="cover-image-wrap">
                <a href="javascript:;" class="" target="_blank"></a>
              </div>
            </div>
            <div class="bottom" v-if="type === TypeEnum.COMMENT">
              <span>
                {{ dayjs(item.createdAt).locale('zh-cn').from(dayjs()) }}
              </span>
              <div class="action">
                <div class="action-item">
                  <span class="action-text">点赞</span>
                </div>
                <div class="action-item">
                  <span class="action-text">回复</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
//导相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime';
//导国际化插件i18n
import 'dayjs/locale/zh-cn';
dayjs.extend(relativeTime);

enum TypeEnum {
  COMMENT = 'comment',
  FOLLOW = 'follow',
  DIGG = 'digg',
}

interface IProps {
  list: any[];
  type: string;
}

withDefaults(defineProps<IProps>(), {});

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;

const typeLabel = {
  comment: '评论了你的文章',
  digg: '赞了你的文章',
  follow: '关注了你',
};
</script>

<style lang="less" scoped>
.chat-view {
  position: relative;
  width: 100%;
  .followed,
  .notification-list {
    width: 100%;
    margin-bottom: 1rem;
    .item {
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
    .notification {
      padding: 1.67rem;
      display: flex;
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
      background: #fff;
      .avatar {
        width: 45px;
        height: 45px;
        border-radius: 100%;
        margin-right: 1rem;
      }
      .right {
        display: flex;
        flex: 1;
        flex-direction: column;
        .top {
          display: flex;
          .content {
            flex: 1;
            margin-right: 1.67rem;
            .profile {
              margin-bottom: 10px;
              .name {
                color: #2e3135;
                font-size: 15px;
                font-weight: 500;
                padding-right: 4px;
              }
              .title {
                font-size: 15px;
                font-weight: 400;
                .title-article {
                  color: var(--Yuexing-color);
                }
              }
            }
            .comment {
              font-size: 15px;
              margin-bottom: 10px;
              padding: 10px;
              background: #fafbfc;
              border-radius: 3px;
              border: 1px solid #f1f1f2;
              .emoji {
                vertical-align: sub;
                width: auto;
                height: 20px;
                cursor: default;
                margin: 0 2px;
              }
            }
            .info {
              font-size: 14px;
              display: flex;
              color: #8a9aa9;
              .time {
                margin-right: 4px;
              }
            }
          }
          .cover-image-wrap {
            width: 65px;
            height: 65px;
            box-sizing: border-box;
            border-radius: 2px;
            &.bgc {
              background: #f4f4f4;
            }
          }
          .cover-image {
            width: 100%;
            height: 100%;
            -o-object-fit: cover;
            object-fit: cover;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            font-size: 14px;
            line-height: 18px;
            font-weight: 400;
            color: #8a9aa9;
            .mg {
              width: calc(100% - 8px);
              margin: 4px;
              height: 56px;
              .emoji {
                vertical-align: sub;
                width: auto;
                height: 18px;
                cursor: default;
                margin: 0 2px;
              }
            }
          }
        }
        .bottom {
          font-size: 12px;
          display: flex;
          color: #8a9aa9;
          justify-content: space-between;
          .action {
            display: flex;
            align-items: center;
            .action-item {
              display: flex;
              align-items: center;
              margin-left: 20px;
              cursor: pointer;
              .action-text {
                margin-left: 5px;
                font-size: 13px;
              }
              &:hover {
                color: var(--Yuexing-color);
              }
            }
          }
        }
      }
    }
  }
}
</style>
