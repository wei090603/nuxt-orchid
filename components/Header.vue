<template>
  <header>
    <div class="header-left">
      <div class="logo">兰花交流</div>
      <menu class="menu">
        <span v-for="item in navgationList">{{ item.title }}</span>
      </menu>
    </div>
    <div class="header-right">登录/注册</div>
  </header>
</template>

<script lang="ts" setup>
const env = useRuntimeConfig();
const baseUrl: string = env.public.VITE_API_URL;
console.log(baseUrl, "baseUrl");
const { data, error } = await useFetch(`${baseUrl}/navgation`);
const navgationList = data._rawValue.data;
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
