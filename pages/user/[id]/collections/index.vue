<template>
  <div class="wrapper">
    <LoadingGroup :pending="pending" :error="error" :isEmpty="data.length === 0">
      <div class="article-container">
        <UserArticle v-for="(item, index) in data" :key="index" :item="item" />
      </div>
    </LoadingGroup>
  </div>
</template>

<script lang="ts" setup>
import { getUserCollect } from '@/api/user';
import UserArticle from '../../../../components/Article/userArticle.vue';

const route = useRoute();

const id = route.params.id as string;

const { pending, data, error } = await getUserCollect(id);
</script>
