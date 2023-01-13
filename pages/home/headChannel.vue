<template>
  <div class="header-channel">
    <div class="channel-icons">
      <div class="channel-icons-item">
        <span class="icon"><i class="iconfont icon-dongtai"></i></span>
        <span class="title">动态</span>
      </div>
      <div class="channel-icons-item">
        <span class="icon"><i class="iconfont icon-remen"></i></span>
        <span class="title">热门</span>
      </div>
      <div class="channel-icons-item">
        <span class="icon"><i class="iconfont icon-paihang"></i></span>
        <span class="title">排行</span>
      </div>
    </div>
    <div class="right-channel-container">
      <div class="channel-items-left">
        <NuxtLink to="/" class="channel-link" v-for="item in categoryList">{{ item }}</NuxtLink>
      </div>
      <div class="channel-items-right">
        <NuxtLink to="/" class="channel-link-right" v-for="item in specialColumn">
          {{ item }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const categoryList = [
  '春兰',
  '蕙兰',
  '建兰',
  '莲瓣',
  '寒兰',
  '春剑',
  '墨兰',
  '秋榜',
  '兔耳兰',
  '送春',
  '绿兰',
  '豆瓣',
];

// 专栏
const specialColumn = ['新手上路', '养兰知识', '市场行情', '兰花科普', '兰花鉴赏', '兰园认证'];
</script>

<style lang="less" scoped>
.header-channel {
  width: 1200px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding-top: 20px;
  .channel-icons {
    width: 200px;
    display: flex;
    align-items: center;
    .channel-icons-item {
      margin-right: 24px;
      position: relative;
      display: flex;
      flex-direction: column;
      margin-right: 16px;
      color: #18191c;
      &:nth-of-type(1) {
        .icon {
          background: #ff9212;
        }
      }
      &:nth-of-type(2) {
        .icon {
          background: #f07775;
        }
      }
      &:nth-of-type(3) {
        .icon {
          background: #ed433f;
        }
      }
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 6px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        transition: background 0.3s;
        width: 46px;
        height: 46px;
        color: #fff;
        i {
          font-size: 24px;
        }
      }
      .title {
        font-size: 14px;
        line-height: 20px;
        text-align: center;
      }
    }
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
</style>
