<template>
  <div class="wrapper">
    <LoadingGroup :pending="pending" :error="error">1111111111111</LoadingGroup>
  </div>
</template>

<script lang="ts" setup>
import { getUserArticle } from '~~/api/user';

const route = useRoute();

const id = route.params.id as string;

const { pending, data, error } = await getUserArticle(id);
</script>

<style lang="less" scoped>
.wrapper {
  padding-top: 60px;
}
</style>
