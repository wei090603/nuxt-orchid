<template>
  <LoadingGroup :pending="pending" :error="error" :isEmpty="data.list.length === 0">
    <MessageMain type="digg" :list="data.list" />
  </LoadingGroup>
</template>

<script lang="ts" setup>
import { getSystemMsg } from '@/api/notification';

const { pending, data, error } = await getSystemMsg({ page: 1, limit: 10 });
</script>

<style lang="less" scoped></style>
