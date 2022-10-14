<template>
  <div class="wrapper">
    <Banner type="home" />

    <!-- 主体内容 -->
    <div class="main">
      <div class="container">
        <!-- 文章列表 -->
        <ArticleList />

        <Function />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '兰花交流网 － 兰花问题,兰草交易,兰花图片,了解中国兰花尽在本兰花网',
});
</script>

<style lang="less" scoped>
.wrapper {
  padding-top: 60px;
}

/* 主体内容 */
.main {
  padding-top: 10px;
  margin-bottom: 5px;
  .container {
    display: flex;
    justify-content: space-between;
    width: 1250px;
    margin: 0 auto;
  }
}
</style>
