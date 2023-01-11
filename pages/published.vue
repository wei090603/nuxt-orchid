<template>
  <div class="wrapper">
    文章发布成功

    <n-button type="primary" @click="handleToHome">回到首页</n-button>
  </div>
</template>

<script lang="ts" setup>
const handleToHome = () => {
  navigateTo('/');
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 960px;
  height: 400px;
  background: #fff;
  margin: 80px auto 0;
}
</style>
