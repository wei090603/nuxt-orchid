<template>
  <div class="wrapper">
    <LoadingGroup :pending="pending" :error="error" :isEmpty="data.length === 0">
      <UserArticle v-for="(item, index) in data" :key="index" :item="item" />
    </LoadingGroup>
  </div>
</template>

<script lang="ts" setup>
import { getUserArticle } from '@/api/user';
import UserArticle from '../components/userArticle.vue';

const route = useRoute();

const id = route.params.id as string;

const { pending, data, error } = await getUserArticle(id);
</script>

<style lang="less" scoped>
.article-item {
  cursor: pointer;
  position: relative;
  background: #fff;
  padding: 12px 20px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.3s ease-in;
  &:hover {
    background: #fafafa;
  }
  .content-wrapper {
    display: flex;
    padding-bottom: 12px;
    border-bottom: 1px solid #e5e6eb;
    margin-top: 10px;
    width: 100%;
    .content-main {
      flex: 1 1 auto;
      .title {
        display: flex;
        margin-bottom: 8px;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #1d2129;
        width: 100%;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
      .abstract {
        color: #86909c;
        font-size: 13px;
        line-height: 22px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        margin-bottom: 10px;
      }
    }
    .thumb {
      flex: 0 0 auto;
      width: 120px;
      height: 80px;
      margin-left: 24px;
      background-color: #fff;
      border-radius: 2px;
    }
  }
}
</style>
