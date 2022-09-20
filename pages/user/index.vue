<template>
  <div class="wrapper">
    个人中心

    <NuxtLink to="/user/3">跳转</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
//用户权限验证
definePageMeta({
  middleware: ['auth'],
});
</script>

<style lang="less" scoped>
.wrapper {
  padding-top: 80px;
}
</style>
