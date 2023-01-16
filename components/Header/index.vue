<template>
  <header>
    <div class="container">
      <div class="header-left">
        <nuxt-link to="/" class="logo"></nuxt-link>
        <menu class="menu">
          <span v-for="item in data" :key="item.link" v-if="data.length">
            <nuxt-link :to="item.link" :class="{ active: active === item.link }">
              {{ item.title }}
            </nuxt-link>
          </span>
        </menu>
      </div>
      <div class="header-right">
        <div class="search">
          <input class="search-input" type="text" placeholder="兰花怎么养" />
          <button class="btn"><i class="iconfont icon-sousuo"></i></button>
        </div>
        <div class="write-btn">
          <button>提问</button>
        </div>
        <client-only>
          <div class="center" v-if="isLogin">
            <HeaderMessage />
            <HeaderCreator />
            <Avatar />
          </div>
          <div class="login-btn" @click="handleLoginRegisterBtn" v-else>登录/注册</div>
        </client-only>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { getNavgation } from '@/api/common';

const route = useRoute();
const isLogin = useIsLogin();

const { data } = await getNavgation();

const handleLoginRegisterBtn = () => {
  useShowModal();
};

const active = ref(route.path as string);

watch(
  () => route.path,
  (newVal) => {
    active.value = newVal;
  }
);

const handleToAdd = () => {
  if (isLogin.value) {
    navigateTo({
      path: '/editor/new',
    });
  } else {
    useShowModal();
  }
};
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
  z-index: 99;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1200px;
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
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 390px;
      height: 34px;
      border-radius: 999px;
      background: #f6f6f6;
      padding-left: 16px;
      border: 1px solid #f6f6f6;
      .search-input {
        flex: 1;
        background: none;
      }
      .btn {
        padding: 0 12px;
        background: none;
        outline: none;
        border: none;
        color: #8590a6;
        line-height: 0;
        cursor: pointer;
      }
    }
    .write-btn {
      button {
        width: 70px;
        height: 34px;
        line-height: 34px;
        margin-left: 15px;
        margin-right: 24px;
        border-radius: 999px;
        background: #1abc9c;
        border: none;
        color: #fff;
        cursor: pointer;
      }
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
    .center {
      display: flex;
      align-items: center;
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
