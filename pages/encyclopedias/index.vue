<template>
  <div class="container">
    <ArticleCategory />
    <div class="encyclopedias-carousel"><Banner /></div>
    <div class="encyclopedias-wrap">
      <div class="main-column">
        <ArticleUserArticle v-for="(item, index) in data.list" :key="index" :item="item" />
      </div>
      <CommunityAside />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Banner from '../home/banner.vue';

import { getArticle } from '@/api/user';

const { pending, data, error } = await getArticle(+1, { page: 1, limit: 10 });
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  min-height: 100vh;
  padding-top: 100px;
  .encyclopedias-carousel {
    height: 240px;
    margin: 10px auto;
    width: 1200px;
  }
  .encyclopedias-wrap {
    display: flex;
    margin: 0 auto;
    width: 1200px;
    .main-column {
      flex: 1;
      align-self: flex-start;
      box-shadow: 0 1px 3px rgb(26 26 26 / 20%);
    }
  }
}
</style>
