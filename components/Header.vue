<template>
  <header>
    <div class="header-left">
      <div class="logo"><img src="~/assets/images/logo.png" /></div>
      <menu class="menu">
        <span v-for="item in navgationList" :key="item.link">
          <NuxtLink :to="item.link">{{ item.title }}</NuxtLink>
        </span>
      </menu>
    </div>
    <div class="header-right">
      <div class="search">
        <n-input-group>
          <n-input type="text" placeholder="请搜索" :style="{ width: '70%' }" /><n-button type="primary" ghost>搜索</n-button>
        </n-input-group>
      </div>
      <div class="login-btn" @click="handleLoginRegisterBtn" v-if="!isLogin">登录/注册</div>
      <div class="" v-else>{{userInfo.account}}</div>
    </div>
  </header>
  <login-register v-model:isShowModal="isShowModal" />
</template>

<script lang="ts" setup>
import { NInput, NButton, NInputGroup } from 'naive-ui';
import { navgation } from '~~/api/home';
const navgationList = await navgation();

const isLogin = useIsLogin()
const userInfo = useUserInfo()

const state = reactive({
  isShowModal: false
})

const handleLoginRegisterBtn = () => {
  state.isShowModal = true
}

const { isShowModal } = toRefs(state)
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
  padding: 0px 50px;
  .header-left {
    display: flex;
    align-items: center;
  }
  .header-right {
    display: flex;
    align-items: center;
    .search {
      width: 300px;
      margin-right: 10px;
    }
    .login-btn {
      height: 34px;
      line-height: 34px;
      background: rgba(30,255,130,.05);
      border: 1px solid #1abc9c;
      border-radius: 4px;
      color: #1abc9c;
      font-size: 14px;
      outline: none;
      transition: background-color .3s, color .3s;
      cursor: pointer;
      padding: 0 14px;
    }
  }
}

.logo {
  width: 60px;
  height: 100%;
  img {
    display: block;
    width: 100%;
  }
}

.menu span {
  margin: 0 1rem;
  a{
    color:#515767;
    font-size: 14px;
    &.active {
      color: #1abc9c;
    }
  }
}
</style>
