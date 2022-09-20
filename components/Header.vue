<template>
  <header>
    <div class="container">
      <div class="header-left">
        <NuxtLink to="/" class="logo"></NuxtLink>
        <menu class="menu">
          <span v-for="item in data" :key="item.link" v-if="data.length">
            <NuxtLink :to="item.link">{{ item.title }}</NuxtLink>
          </span>
        </menu>
      </div>
      <div class="header-right">
        <div class="search">
          <n-input-group>
            <n-input
              type="text"
              placeholder="请搜索"
              :style="{ width: '70%' }"
            />
            <n-button type="primary" ghost>搜索</n-button>
          </n-input-group>
        </div>
        <div class="release-btn">
          <n-button type="primary" @click="handleToAdd">发表文章</n-button>
        </div>
        <div class="login-btn" @click="handleLoginRegisterBtn" v-if="!isLogin">
          登录/注册
        </div>
        <div class="" v-else>{{ userInfo.account }}</div>
      </div>
    </div>
  </header>
  <login-register v-model:isShowModal="isShowModal" />
</template>

<script lang="ts" setup>
import { NInput, NButton, NInputGroup } from 'naive-ui';
import { getNavgation } from '@/api/common';

const isLogin = useIsLogin();
const userInfo = useUserInfo();

const state = reactive({
  isShowModal: false,
});

const { data } = await getNavgation();

const handleLoginRegisterBtn = () => {
  state.isShowModal = true;
};

const handleToAdd = () => {
  navigateTo({
    path: '/article/add',
  });
};

const { isShowModal } = toRefs(state);
</script>

<style lang="less" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
  background: #fff;
  z-index: 9;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1250px;
    height: 100%;
    margin: 0 auto;
  }
  .header-left {
    display: flex;
    align-items: center;
  }
  .header-right {
    display: flex;
    align-items: center;
    .search {
      width: 300px;
    }
    .release-btn {
      margin-right: 10px;
    }
    .login-btn {
      height: 34px;
      line-height: 34px;
      background: rgba(30, 255, 130, 0.05);
      border: 1px solid #1abc9c;
      border-radius: 4px;
      color: #1abc9c;
      font-size: 14px;
      outline: none;
      transition: background-color 0.3s, color 0.3s;
      cursor: pointer;
      padding: 0 14px;
    }
  }
}

.logo {
  display: block;
  width: 50px;
  height: 60px;
  background: url(@/assets/images/logo.png) no-repeat center;
  background-size: 100%;
}

.menu span {
  margin: 0 1rem;
  a {
    color: #515767;
    font-size: 14px;
    &.active {
      color: #1abc9c;
    }
  }
}
</style>
