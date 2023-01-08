<template>
  <div class="right-container">
    <div class="sticky">
      <div class="sidebar-block author-block pure">
        <div class="author-box">
          <nuxt-link class="user-item" target="_blank" :to="{ path: `/user/${userId}` }">
            <img :src="imgUrl + userInfo.avatar" alt="" />
            <div class="info-box">
              <div class="nickname">{{ userInfo.nickName }}</div>
              <div class="sign">{{ userInfo.signText || '个性一签，一见难忘' }}</div>
            </div>
          </nuxt-link>
          <div class="operate-btn" v-if="userId !== currentUser?.id">
            <n-button type="primary" :disabled="userInfo.isFollow">
              {{ userInfo.isFollow ? '已' : '' }}关注
            </n-button>
            <span></span>
            <n-button type="primary" ghost>私信</n-button>
          </div>
        </div>
        <div class="stat-item item">文章获得点赞量 {{ userInfo.likeTotal || 0 }}</div>
        <div class="stat-item item">文章被阅读量 {{ userInfo.readTotal || 0 }}</div>
      </div>
      <div class="sidebar-block related-entry shadow">
        <div class="block-title">相关文章</div>
        <div class="list">
          <nuxt-link :to="{ path: '/artile/16' }" target="_blank" class="item">
            <div class="entry-title">正则什么的，你让我写，我会难受，你让我用，真香！</div>
            <div class="entry-meta-box">
              <div class="entry-meta">676点赞</div>
              <div class="entry-meta">&nbsp;·&nbsp;</div>
              <div class="entry-meta">62评论</div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getOhterUserInfo } from '@/api/user';

type IUserInfo = {
  id: number;
  avatar: string;
  nickName: string;
  likeTotal: number;
  readTotal: number;
  signText: string;
  isFollow: boolean;
};

type IProps = {
  userId: number;
};

const props = withDefaults(defineProps<IProps>(), {});

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;

const currentUser = useUserInfo();

const userInfo = ref<IUserInfo>({
  id: 0,
  avatar: '',
  nickName: '',
  likeTotal: 0,
  signText: '',
  readTotal: 0,
  isFollow: false,
});

const { data } = await getOhterUserInfo(props.userId);
userInfo.value = data.value;
</script>

<style lang="less" scoped>
.right-container {
  width: 280px;
  margin-left: 20px;
  .sticky {
    position: sticky;
    top: 70px;
    .sidebar-block {
      margin-bottom: 20px;
      background: #fff;
    }
    .author-block {
      border-radius: 4px;

      padding: 20px 10px;
      .author-box {
        border-bottom: 1px solid #e4e6eb;
        margin-bottom: 10px;
      }
      .user-item {
        display: flex;
        align-items: center;
        padding-bottom: 15px;
        img {
          flex: 0 0 auto;
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .info-box {
          flex: 1 1 auto;
          min-width: 0;
          margin-left: 15px;
        }
      }
      .operate-btn {
        display: flex;
        justify-content: space-between;
        padding-bottom: 15px;
        .n-button {
          flex: 1;
        }
        span {
          width: 15px;
        }
      }
      .stat-item {
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        &:first-of-type {
          margin-top: 20px;
        }
      }
    }
    .related-entry {
      .block-title {
        padding: 15px 10px;
        font-size: 16px;
        line-height: 2rem;
        color: #1d2129;
        font-weight: 500;
        border-bottom: 1px solid #e4e6eb;
      }
      .list {
        .item {
          display: block;
          padding: 10px 15px;
          .entity-title {
            line-height: 22px;
            font-size: 15px;
            font-weight: 400;
            color: #252933;
          }
          .entry-meta-box {
            margin-top: 4px;
            .entry-meta {
              display: inline-block;
              line-height: 22px;
              color: #8a919f;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
}
</style>
