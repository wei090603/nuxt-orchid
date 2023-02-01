<template>
  <div class="wrapper">
    <div class="main">
      <div class="left-container">
        <div class="content-top">
          <h2 class="title">{{ data.title }}</h2>
          <div class="author-block">
            <nuxt-link target="_blank" :to="{ path: `/user/${data.author.id}` }">
              <img class="avatar" :src="imgUrl + data.author.avatar" alt="" />
            </nuxt-link>
            <div class="author-info-box">
              <div class="nickname">
                <nuxt-link target="_blank" :to="{ path: `/user/${data.author.id}` }">
                  {{ data.author.nickName }}
                </nuxt-link>
              </div>
              <div class="date">{{ data.createdAt }} · 阅读 {{ data.reading }}</div>
            </div>
          </div>
          <div class="content" v-html="data.content"></div>
          <div class="article-end-box">
            <div class="category">
              <span>分类:</span>
              <n-button tertiary>{{ data.category.title }}</n-button>
            </div>
          </div>
        </div>
      </div>
      <ArticleRightContainer :userId="data.author.id"></ArticleRightContainer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getEncyclopediasDetail } from '@/api/encyclopedias';

const route = useRoute();

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;

const id = route.params.id as string;

const { data } = await getEncyclopediasDetail(+id);

useHead({ title: data.value.title || '' });
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  padding-top: 80px;
}

.main {
  display: flex;
  justify-content: space-between;
  width: 1100px;
  margin: 0 auto;
  padding-bottom: 20px;
}

.left-container {
  flex: 1;
  .content-top {
    padding: 20px;
    background: #fff;
    .title {
      margin-bottom: 15px;
      font-size: 20px;
      font-weight: 600;
      color: #252933;
    }
    .author-block {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .avatar {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      .author-info-box {
        flex: 1;
        .nickname {
          color: #515767;
          font-size: 16px;
        }
        .date {
          color: #8a919f;
        }
      }
    }
    .content {
      margin-bottom: 20px;
    }
    .article-end-box {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .category {
        margin-right: 20px;
        span {
          font-size: 14px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>

<style lang="less">
.content {
  h3 {
    font-size: 1.4rem;
    line-height: 190%;
    margin: 2px -25px 10px -25px;
    padding: 0 20px;
    border-left: 5px solid var(--Yuexing-color);
  }
}
</style>
