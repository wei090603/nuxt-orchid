<template>
  <LoadingGroup :pending="pending" :error="error" :isEmpty="data.list.length === 0">
    <div class="chat-view">
      <ul class="notification-list">
        <MessageItem v-for="item in data.list" :key="item.id" :item="item" />
      </ul>
    </div>
  </LoadingGroup>
</template>

<script lang="ts" setup>
import { getCommentMsg } from '@/api/notification';

const { pending, data, error } = await getCommentMsg({ page: 1, limit: 10 });
</script>

<style lang="less" scoped>
.chat-view {
  position: relative;
  width: 100%;
  .followed,
  .notification-list {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
