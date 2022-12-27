<template>
  <div class="wrapper">
    <div class="head">
      <div class="left">
        <div class="avatar"><img :src="imgUrl + userInfo.avatar" alt="头像" /></div>
        <div class="nick-name">
          <h1>{{ userInfo.nickName }}</h1>
          <div class="sign">{{ userInfo.sign }}</div>
        </div>
      </div>
      <div class="right">
        <div class="jifen">100</div>
        <div class="btn">
          <n-button v-if="Number(id) === myInfo?.id" type="primary" ghost @click="handleGoEdit">
            编辑个人资料
          </n-button>
          <template v-else>
            <n-button
              strong
              secondary
              type="tertiary"
              @click="handleFollowDelClick"
              v-if="userInfo.isFollow"
            >
              已关注
            </n-button>
            <n-button type="primary" ghost @click="handleFollowClick" v-else>+关注</n-button>
          </template>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="left-container">
        <div class="profile-main-column">
          <div class="profile-main-header">
            <ul>
              <li
                v-for="item in list"
                :class="{ active: activeName === item.key }"
                @click="navigate(item)"
              >
                {{ item.title }}
              </li>
            </ul>
          </div>
          <NuxtPage />
        </div>
      </div>

      <div class="right-container profile-side-column">
        <div class="stat-block block shadow">
          <div class="block-title">个人成就</div>
          <div class="block-body">
            <div class="stat-item">
              <span class="content">
                文章被阅读量
                <span class="count">{{ userInfo.likeTotal }}</span>
              </span>
            </div>

            <div class="stat-item">
              <span class="content">
                文章获得点赞量
                <span class="count">{{ userInfo.readTotal }}</span>
              </span>
            </div>
          </div>
        </div>

        <div class="followship-card">
          <a type="button" class="button">
            <div class="number-board">
              <div class="name">关注了</div>
              <b class="value" :title="userInfo.followNum">{{ userInfo.followNum }}</b>
            </div>
          </a>
          <a type="button" class="button">
            <div class="number-board">
              <div class="name">关注者</div>
              <b class="value" :title="userInfo.followedNum">{{ userInfo.followedNum }}</b>
            </div>
          </a>
        </div>
        <div class="line-list">
          <NuxtLink class="line-item" :to="{ path: `/user/${id}/collections` }">
            <span class="item-name">收藏集</span>
            <span class="item-value">{{ userInfo.collectNum }}</span>
          </NuxtLink>
          <NuxtLink class="line-item" :to="{ path: `/user/${id}/likes` }">
            <span class="item-name">点赞集</span>
            <span class="item-value">{{ userInfo.likeNum }}</span>
          </NuxtLink>
          <a class="line-item" href="javascript:;">
            <span class="item-name">加入于</span>
            <span class="item-value">
              {{ dayjs(userInfo.createdAt).format('YYYY-MM-DD') }}
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getOhterUserInfo, postFollow, deleteFollow } from '~~/api/user';
import { NButton } from 'naive-ui';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // 导入本地化语言
dayjs.locale('zh-cn'); // 使用本地化语言

const route = useRoute();
const isLogin = useIsLogin();

const id = route.params.id as string;

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;

const myInfo = useUserInfo();

const { pending, data: userInfo, error } = await getOhterUserInfo(+id);

useHead({
  title: userInfo.value.nickName + ' 的个人主页 - 兰苑',
});

const activeName = computed(() => route.name);

const list = [
  {
    title: '动态',
    name: `/user/${id}`,
    key: 'user-id',
  },
  {
    title: '文章',
    name: `/user/${id}/posts`,
    key: 'user-id-posts',
  },
  {
    title: '收藏',
    name: `/user/${id}/collections`,
    key: 'user-id-collections',
  },
  {
    title: '点赞',
    name: `/user/${id}/likes`,
    key: 'user-id-likes',
  },
  {
    title: '关注',
    name: `/user/${id}/following`,
    key: 'user-id-following',
  },
];

const navigate = (item: { title: string; name: string }) => {
  navigateTo({
    path: item.name,
  });
};

const handleGoEdit = () => {
  navigateTo({
    path: '/my/profile',
  });
};

// 关注
const handleFollowClick = async () => {
  if (isLogin.value) {
    await postFollow({ followId: +id });
    userInfo.value.isFollow = true;
  } else {
    useShowModal();
  }
};

const handleFollowDelClick = async () => {
  if (isLogin.value) {
    await deleteFollow(id);
  } else {
    useShowModal();
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  padding-top: 70px;
  min-height: 100vh;
  padding-bottom: 50px;
  background: #f4f5f5;

  .head {
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 1100px;
    margin: 0 auto 10px;
    background-color: #fff;
    box-shadow: 0 1px 3px hsl(0deg 0% 7% / 10%);
    .left {
      display: flex;
      align-items: center;
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
}

.container {
  display: flex;
  width: 1100px;
  margin: 0 auto;
  .left-container {
    flex: 1;
  }

  .profile-main-column {
    width: 100%;
    overflow: hidden;
    .profile-main-header {
      position: relative;
      margin: 0;
      padding: 0;
      height: 40px;
      background-color: #fff;
      border-radius: 0.2rem 0.2rem 0 0;
      border-bottom: 1px solid #e4e6eb;
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
          cursor: pointer;
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

  .profile-side-column {
    margin-left: 10px;
    width: 296px;
    color: #646464;
    max-width: 296px;

    .stat-block {
      margin-bottom: 10px;
      background-color: #fff;
      border-radius: 2px;
      .block-title {
        padding: 15px;
        font-size: 16px;
        font-weight: 600;
        color: #31445b;
        border-bottom: 1px solid rgba(230, 230, 231, 0.5);
      }
      .block-body {
        padding: 10px;
        .stat-item {
          display: flex;
          align-items: center;
          font-size: 15px;
          color: #000;
        }
        .stat-item:not(:last-child) {
          margin-bottom: 0.8rem;
        }
      }
    }
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
}
</style>
