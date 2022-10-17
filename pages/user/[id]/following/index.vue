<template>
  <div class="wrapper">
    <div class="sub-tab">
      <div class="left">关注</div>
      <div class="right">
        <span>我关注的</span>
        <span>关注者</span>
      </div>
    </div>
    <LoadingGroup :pending="pending" :error="error">111</LoadingGroup>
  </div>
</template>

<script lang="ts" setup>
import { getUserArticle } from '~~/api/user';

const route = useRoute();

const id = route.params.id as string;
console.log(id, 'id');

const { pending, data, error } = await getUserArticle(id);
</script>

<style lang="less" scoped>
.sub-tab {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #e4e6eb;
}
</style>
