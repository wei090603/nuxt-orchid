<template>
  <div class="wrapper">
    <ArticleCategory />
    <div class="main">
      <div class="container">
        <ArticleList />
        <CommunityAside />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.wrapper {
  padding-top: 100px;
  background-color: var(--Yuexing-body-bg);
}

.main {
  padding-top: 10px;
  margin-bottom: 5px;
  .container {
    display: flex;
    justify-content: space-between;
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
