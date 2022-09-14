<template>
  <div class="wrapper">
    <div class="header">
      <div class="container">
        <div class="left">
          <NuxtLink to="/" class="logo"></NuxtLink>
          <i></i>
          <div class="page-title">写文章</div>
        </div>
        <div class="right">
          <div class=""><n-button type="primary">发布</n-button></div>
          <div class="avatar"></div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="title">
        <input type="text" placeholder="请输入标题(最多 100 个字)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #f1f1f1;
  background: #fff;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1250px;
    height: 100%;
    margin: 0 auto;
    .left {
      display: flex;
      align-items: center;
      .logo {
        display: block;
        width: 50px;
        height: 50px;
        background: url(@/assets/images/logo.png) no-repeat center;
        background-size: 100%;
      }
      i {
        height: 30px;
        width: 1px;
        margin-left: 17px;
        margin-right: 16px;
        background-color: #ebebeb;
      }
      .page-title {
        font-weight: 600;
        font-size: 16px;
      }
    }
  }
}

.main {
  width: 1250px;
  height: 500px;
  margin: 20px auto 0;
  padding: 0 15px;
  background: #fff;
  .title {
    width: 100%;
    height: 78px;
    border-bottom: 1px solid #f1f1f1;
    input {
      width: 100%;
      height: 100%;
      font-size: 32px;
      &::placeholder {
        font-weight: 600;
        font-size: 32px;
        letter-spacing: 2px;
      }
    }
  }
}
</style>
