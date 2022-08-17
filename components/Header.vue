<template>
  <header>
    <div class="header-left">
      <div class="logo">兰花交流</div>
      <menu class="menu">
        <span v-for="item in navgationList">{{ item.title }}</span>
      </menu>
    </div>
    <div class="header-right" @click="handleLoginRegisterBtn">登录/注册</div>
  </header>
  <login-register v-model:isShowModal="isShowModal" />
</template>

<script lang="ts" setup
>import { navgation } from '~~/composables/home';
const data= await navgation();
const navgationList = data.value;

const state = reactive({
  isShowModal: false
})

const handleLoginRegisterBtn = () => {
  state.isShowModal = true
}

const { isShowModal } = toRefs(state)
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background: #1abc9c;
  width: 100%;
}
.header-left {
  display: flex;
  align-items: center;
}
.logo {
  font-size: 20px;
}
</style>
