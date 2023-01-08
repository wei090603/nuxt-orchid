<template>
  <div>11</div>
</template>

<script lang="ts" setup>
import { getLikeMsg } from '@/api/notification';

const { data } = await getLikeMsg({ page: 1, limit: 10 });

console.log(data.value, 'data');
</script>
