<template>
  <div class="right-container">
    <div class="sticky">
      <div class="sidebar-block author-block pure">
        <nuxt-link
          class="user-item"
          target="_blank"
          :to="{ path: `/user/${userInfo.id}` }"
        >
          <img :src="imgUrl + userInfo.avatar" alt="" />
          <div class="info-box">
            <div class="nickname">{{ userInfo.nickName }}</div>
            <div class="sign">fwefw</div>
          </div>
        </nuxt-link>
        <div class="stat-item item">文章获得点赞</div>
        <div class="stat-item item">文章被阅读</div>
      </div>
      <div class="sidebar-block related-entry shadow">
        <div class="block-title">相关文章</div>
        <div class="list">
          <nuxt-link :to="{ path: '/artile/16' }" target="_blank" class="item">
            <div class="entry-title">
              正则什么的，你让我写，我会难受，你让我用，真香！
            </div>
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
type IUserInfo = {
  id: string;
  avatar: string;
  nickName: string;
};
type IProps = {
  userInfo: IUserInfo;
};

withDefaults(defineProps<IProps>(), {});

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;
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
      .user-item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e4e6eb;
        padding-bottom: 1.416rem;
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
