<template>
  <div class="wrapper">
    <!-- <LoadingGroup :pending="pending" :error="error">1111111111111</LoadingGroup> -->
    1111111111111111
  </div>
</template>

<script lang="ts" setup>
import { getOhterUserInfo } from '~~/api/user';

const route = useRoute();

const id = route.params.id as string;
console.log(id, 'id');

const { pending, data, error } = await getOhterUserInfo(id);
</script>

<style lang="less" scoped>
.wrapper {
  padding-top: 60px;
}
</style>
