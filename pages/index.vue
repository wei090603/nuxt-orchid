<template>
  <div class="wrapper">
    <HeadChannel />

    <!-- 主体内容 -->
    <div class="main">
      <div class="feed1-layout">
        <Banner />
        <Author />
      </div>
      <NavMenu />
      <div class="container recommend">
        <div class="l">
          <div class="title-box">
            <span class="icon">
              <i class="iconfont icon-remen"></i>
            </span>
            <h4 class="title">兰花热卖</h4>
          </div>
          <div class="content-box video-box">
            <!-- <RecommendItem v-for="item in 6" /> -->
          </div>
          <div class="title-box">
            <span class="icon">
              <i class="iconfont icon-shipin1"></i>
            </span>
            <h4 class="title">视频推荐</h4>
          </div>
          <div class="content-box video-box">
            <!-- <RecommendItem v-for="item in 6" /> -->
          </div>
          <div class="title-box">
            <span class="icon">
              <i class="iconfont icon-16"></i>
            </span>
            <h4 class="title">文章推荐</h4>
          </div>
          <div class="content-box article-box">
            <RecommendItem
              v-for="item in recommendArticle"
              :item="item"
              :key="item.id"
              @handleItemClick="handleArticleClick"
            />
          </div>
          <div class="title-box">
            <span class="icon">
              <i class="iconfont icon-huodongbiaoqian"></i>
            </span>
            <h4 class="title">活动专区</h4>
          </div>
          <div class="content-box activity-box"></div>
        </div>
        <div class="r">
          <h4 class="title">排行榜</h4>
          <Rank />
          <h4 class="title">推荐关注</h4>
          <Rank />
          <h4 class="title">排行榜</h4>
          <Rank />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticleHot } from '@/api/home';

import HeadChannel from './home/headChannel.vue';
import Banner from './home/banner.vue';
import Author from './home/author.vue';
import NavMenu from './home/menu.vue';
import Rank from './home/rank.vue';
import RecommendItem from './home/RecommendItem.vue';

const router = useRouter();

useHead({
  title: '兰花交流网 － 兰花问题,兰草交易,兰花图片,了解中国兰花尽在本兰花网',
});

const { data: recommendArticle } = await getArticleHot();

console.log(recommendArticle.value, 'recommendArticle');

const handleArticleClick = (item) => {
  window.open(`/article/${item.id}`, '_blank');
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  min-height: 100vh;
  padding-top: 60px;
  background: #fff;
}

/* 主体内容 */
.main {
  width: 1200px;
  margin: 0 auto;
  .feed1-layout {
    display: flex;
    justify-content: space-between;
    margin: 20px auto;
    height: 340px;
  }
  .container {
    display: flex;
    justify-content: space-between;
    .l {
      flex: 1;
    }
    .r {
      width: 300px;
      margin-left: 15px;
    }
  }
  .recommend {
    margin-bottom: 20px;
    .l {
      .title-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        transition: color 0.2s linear;
        height: 34px;
        margin-bottom: 12px;
        .title {
          font-size: 20px;
          color: #18191c;
        }
        .icon {
          margin-right: 5px;
          i {
            font-size: 22px;
            color: #ed433f;
          }
        }
      }
      .content-box {
        display: grid;
        position: relative;
        width: 100%;
        grid-gap: 20px;
        grid-column: span 3;
        grid-template-columns: repeat(3, 1fr);
        margin-bottom: 20px;
      }
    }
    .r {
      .title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 20px;
        color: #18191c;
        transition: color 0.2s linear;
        height: 34px;
        margin-bottom: 12px;
      }
    }
  }
  .article-recommend {
    margin-bottom: 20px;
  }
}
</style>
