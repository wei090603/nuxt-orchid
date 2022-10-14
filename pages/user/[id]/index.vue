<template>
  <div class="wrapper">
    <div class="head">
      <div class="left">
        <div class="avatar"><img :src="imgUrl + userInfo.avatar" alt="头像" /></div>
        <div class="nick-name">
          <h1>{{ userInfo.nickName }}</h1>
        </div>
      </div>
      <div class="right">
        <div class="jifen">100</div>
        <div class="btn"><n-button type="primary" ghost>编辑个人资料</n-button></div>
      </div>
    </div>
    <div class="container">
      <div class="profile-main">
        <div class="profile-main-column">
          <div class="card">
            <div class="profile-main-header">
              <ul>
                <li
                  v-for="item in list"
                  :class="{ active: activeName === item.name }"
                  @click="navigate(item)"
                >
                  {{ item.title }}
                </li>
              </ul>
            </div>
            <ArticleList />
          </div>
        </div>
        <div class="profile-side-column">
          <div class="followship-card">
            <a type="button" class="button">
              <div class="number-board">
                <div class="name">关注了</div>
                <b class="value" title="1">1</b>
              </div>
            </a>
            <a type="button" class="button">
              <div class="number-board">
                <div class="name">关注者</div>
                <b class="value" title="1">1</b>
              </div>
            </a>
          </div>
          <div class="line-list">
            <a class="line-item" href="/people/wo-jiu-kan-kan-66-23/following/topics">
              <span class="item-name">关注的话题</span>
              <span class="item-value">8</span>
            </a>
            <a class="line-item" href="/people/wo-jiu-kan-kan-66-23/following/topics">
              <span class="item-name">关注的话题</span>
              <span class="item-value">8</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui';
//用户权限验证
definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const id = route.params.id as string;

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;

const activeName = ref(`/user/${id}/posts`);
const list = [
  {
    title: '文章',
    name: `/user/${id}/posts`,
  },
  {
    title: '收藏',
    name: `/user/${id}/collections`,
  },
  {
    title: '关注',
    name: `/user/${id}/following`,
  },
  {
    title: '点赞',
    name: `/user/${id}/likes`,
  },
];

const pageKey = computed(() => route.fullPath);

// console.log(pageKey, 'pageKey');

const userInfo = useUserInfo();

const navigate = (item: { title: string; name: string }) => {
  activeName.value = item.name;
  console.log(activeName.value, 'activeName.value');
  navigateTo({
    path: item.name,
  });
};
</script>

<style lang="less" scoped>
.wrapper {
  padding-top: 70px;
}

.head {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 1250px;
  padding: 16px;
  margin: 0 auto;
  background-color: #fff;
  .left {
    display: flex;
    .avatar {
      flex: 0 0 auto;
      margin-right: 20px;
      width: 90px;
      height: 90px;
      background-color: #f9f9f9;
      border-radius: 50%;
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
}

.profile-main {
  display: flex;
  width: 1250px;
  min-height: 100vh;
  margin: 10px auto;
  justify-content: space-between;
  align-items: flex-start;
  .profile-main-column {
    flex: 1;
    overflow: hidden;
    background-color: #fff;
    .profile-main-header {
      position: relative;
      margin: 0;
      padding: 0;
      height: 40px;
      background-color: #fff;
      border-radius: 0.2rem 0.2rem 0 0;
      border-bottom: 1px solid #e4e6eb;
      z-index: 100;
      ul {
        display: flex;
        align-items: center;
        height: 100%;
        max-width: 960px;
        white-space: nowrap;
        position: relative;
        margin: 0 auto;
        li {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 80px;
          height: 100%;
          font-size: 16px;
          font-weight: 400;
          color: #515767;
          &.active {
            color: #252933;
            font-weight: 500;
            &::before {
              content: '';
              position: absolute;
              bottom: 0;
              width: 20px;
              height: 3px;
              background-color: var(--Yuexing-color);
            }
          }
        }
      }
    }
  }
}

.profile-side-column {
  margin-left: 10px;
  width: 296px;
  color: #646464;
  max-width: 296px;
  .followship-card {
    display: flex;
    position: relative;
    margin-bottom: 10px;
    background: #fff;
    overflow: hidden;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
    box-sizing: border-box;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1px;
      height: 50%;
      background-color: #f3f3f4;
      transform: translate(-50%, -50%);
    }
    .button {
      border: 0;
      line-height: unset;
      font-size: unset;
      flex: 1 1;
      .number-board {
        padding: 12px 0;
        text-align: center;
        line-height: 1.6;
        .name {
          font-size: 14px;
          color: #8590a6;
        }
        .value {
          display: inline-block;
          font-size: 18px;
          color: #121212;
          font-weight: 600;
          font-synthesis: style;
        }
      }
    }
  }
  .line-list {
    .line-item {
      padding-left: 5px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: 46px;
      font-size: 14px;
      border-top: 1px solid #ebebeb;
      &:last-child {
        border-bottom: 1px solid #ebebeb;
      }
      .item-name {
        flex-grow: 1;
      }
      .item-value {
        font-size: 14px;
        color: #8590a6;
      }
    }
  }
}
</style>
