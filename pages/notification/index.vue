<template>
  <LoadingGroup :pending="pending" :error="error" :isEmpty="data.list.length === 0">
    <MessageMain type="comment" :list="data.list" />
  </LoadingGroup>
</template>

<script lang="ts" setup>
import { getCommentMsg } from '@/api/notification';

const { pending, data, error } = await getCommentMsg({ page: 1, limit: 10 });
</script>

<style lang="less" scoped></style>
