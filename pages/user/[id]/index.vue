<template>
  <div class="wrapper">
    <LoadingGroup :pending="pending" :error="error" :isEmpty="false">
      <div class="article-container">
        <div class="article-item" v-for="item in data">
          <div class="top">
            {{ item.author.nickName }} | {{ item.createdAt }} | {{ item.category?.title }}
          </div>
          <div class="content">
            <div>{{ item.title }}</div>
            <div>{{ item.summary }}</div>
          </div>
          <div class="bottom">
            查看{{ item.reading }} 点赞{{ item.likeCount }} 评论{{ item.commentCount }}
          </div>
        </div>
      </div>
    </LoadingGroup>
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
.article-container {
  padding: 10px;
}
</style>
