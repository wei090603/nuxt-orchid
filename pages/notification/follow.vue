<template>
  <LoadingGroup :pending="pending" :error="error" :isEmpty="data.list.length === 0">
    <div class="chat-view">
      <ul class="notification-list">
        <MessageMain type="follow" :list="data.list" />
      </ul>
    </div>
  </LoadingGroup>
</template>

<script lang="ts" setup>
import { getFollowMsg } from '@/api/notification';

const { pending, data, error } = await getFollowMsg({ page: 1, limit: 10 });
</script>

<style lang="less" scoped></style>
