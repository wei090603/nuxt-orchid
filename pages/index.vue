<template>
  <div class="wrapper">
    <div class="header-channel">
      <div class="channel-icons">
        <span>动态 热门</span>
      </div>
      <div class="right-channel-container">
        <div class="channel-items-left">
          <NuxtLink to="/" class="channel-link" v-for="item in 14">标签</NuxtLink>
        </div>
        <div class="channel-items-right">
          <NuxtLink to="/" class="channel-link-right" v-for="item in 6">专栏</NuxtLink>
        </div>
      </div>
    </div>

    <div class="feed1-layout">
      <Banner />
      <Author />
    </div>

    <!-- 主体内容 -->
    <div class="main">
      <div class="nav-menu">
        <div class="l">兰苑主页 、视频中心、新闻中心、活动专区</div>
        <div class="r">排行榜</div>
      </div>
      <div class="container recommend">
        <div class="l">
          <h4>视频推荐</h4>
          <div class="">视频列表</div>
          <h4>文章推荐</h4>
          <div class="">文章列表</div>
          <h4>活动专区</h4>
          <div class="">活动列表</div>
        </div>
        <div class="r">
          <h4>良心广告</h4>
          <h4>用户推荐</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Banner from './home/banner.vue';
import Author from './home/author.vue';

useHead({
  title: '兰花交流网 － 兰花问题,兰草交易,兰花图片,了解中国兰花尽在本兰花网',
});
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  min-height: 100vh;
  padding-top: 60px;
  background: #fff;
}

.header-channel {
  width: 1200px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding-top: 20px;
  .channel-icons {
    width: 200px;
  }
  .right-channel-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .channel-items-left {
      display: grid;
      width: 100%;
      grid-auto-flow: column;
      grid-column: span 4;
      grid-gap: 10px;
      grid-template-rows: repeat(2, 1fr);
      padding-right: 30px;
      border-right: 1px solid #e3e5e7;
      .channel-link {
        display: inline-block;
        box-sizing: content-box;
        width: 100%;
        height: 100%;
        border: 1px solid #f1f2f3;
        border-radius: 6px;
        background-color: #f6f7f8;
        color: #61666d;
        text-align: center;
        font-weight: 400;
        transition: background-color 0.3s, color 0.3s;
        letter-spacing: 2px;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        &:hover {
          background-color: #e3e5e7;
          color: #18191c;
        }
      }
    }
    .channel-items-right {
      grid-column: span 1;
      grid-row-gap: 10px;
      grid-auto-flow: column;
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      width: 300px;
      flex-shrink: 0;
      .channel-link-right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        height: 100%;
        color: #61666d;
        text-align: center;
        font-weight: 400;
        transition: background-color 0.3s, color 0.3s;
      }
    }
  }
}

.feed1-layout {
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: 20px auto;
  height: 440px;
}

/* 主体内容 */
.main {
  width: 1200px;
  margin: 0 auto;
  .nav-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    border-radius: 20px;
    padding: 0 20px;
    margin-bottom: 20px;
    box-shadow: #d5d5d5 0px 0px 10px; //将h-shadow,v-shadow设为0px,实现四周阴影
  }
  .container {
    display: flex;
    justify-content: space-between;
    .l {
      flex: 1;
      background: green;
    }
    .r {
      width: 300px;
      margin-left: 15px;
      background: red;
    }
  }
  .vidoe-recommend {
    margin-bottom: 20px;
  }
  .article-recommend {
    margin-bottom: 20px;
  }
}
</style>
