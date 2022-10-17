<template>
  <div class="wrapper">
    <n-grid :x-gap="20">
      <n-grid-item :span="5">
        <div class="menu-container">
          <div class="user-info">
            <n-avatar style="cursor: pointer" round :size="75" :src="imgUrl + userInfo.avatar" />
            <div class="name">{{ userInfo.nickName }}</div>
          </div>
          <ul class="center-menu">
            <li
              :class="{ active: item.name == activeName }"
              v-for="(item, index) in menus"
              :key="index"
              @click="navigate(item)"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
      </n-grid-item>

      <n-grid-item :span="19">
        <div class="content">
          <NuxtPage :page-key="pageKey" />
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
import { NGrid, NGridItem, NAvatar } from 'naive-ui';
const route = useRoute();
const pageKey = computed(() => route.fullPath);

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;

const userInfo = useUserInfo();

const activeName = computed(() => route.name);

const menus = [
  {
    title: '每日签到',
    name: 'my-sign',
  },
  {
    title: '幸运抽奖',
    name: 'my-lottery',
  },
  {
    title: '个人资料',
    name: 'my-profile',
  },
  {
    title: '我的收获',
    name: 'my-gains',
  },
];

const navigate = (item) => {
  if (item) {
    navigateTo({
      name: item.name,
    });
  }
};

//用户权限验证
definePageMeta({
  middleware: ['auth'],
});
</script>

<style lang="less" scoped>
.wrapper {
  width: 1250px;
  padding-top: 80px;
  margin: 0 auto;
}

.menu-container {
  height: 626px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 0.25rem;
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
    .name {
      display: inline-block;
      vertical-align: top;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
      margin-top: 10px;
    }
  }
  .center-menu {
    li {
      cursor: pointer;
      font-size: 0.875rem;
      line-height: 1.25rem;
      padding-left: 1.25rem;
      padding-right: 1.25rem;
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      &.active {
        color: #18a058;
        background-color: #dcffec;
      }
    }
  }
}

.content {
  height: 626px;
  background-color: #fff;
}
</style>
