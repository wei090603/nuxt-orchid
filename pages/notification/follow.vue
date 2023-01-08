<template>
  <div>11</div>
</template>

<script lang="ts" setup>
import { getFollowMsg } from '@/api/notification';
const { data } = await getFollowMsg({ page: 1, limit: 10 });

console.log(data.value, 'data');
</script>
