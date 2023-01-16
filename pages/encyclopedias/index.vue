<template>
  <div class="container">
    <Category v-model:categoryId="categoryId" />
    <div class="encyclopedias-carousel"><Banner /></div>
    <div class="encyclopedias-wrap">
      <div class="main-column">
        <ArticleItem v-for="(item, index) in data.list" :key="index" :item="item" />
      </div>
      <CommunityAside />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getEncyclopediasList } from '@/api/encyclopedias';

import Banner from '../home/banner.vue';
import Category from './category.vue';
import ArticleItem from './articleItem.vue';

const categoryId = ref(null);

const { pending, data, error, refresh } = await getEncyclopediasList({
  page: 1,
  limit: 10,
  categoryId: categoryId.value,
});

watch(
  () => categoryId.value,
  () => {
    refresh();
  }
);
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  min-height: 100vh;
  padding-top: 100px;
  .encyclopedias-carousel {
    height: 440px;
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
