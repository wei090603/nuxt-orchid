<template>
  <div class="container">
    <div class="video-wrap">
      <div class="category"></div>
      <div class="recommend-container">
        <div class="recommend-carousel"><Banner /></div>
        <div class="recommend-box">
          <div class="recommend-item" v-for="item in 6" @click="">
            <img src="" alt="" />
            <div class="title">
              虽然你们失去的是工资，但是我们收获的是快乐哈哈哈哈哈哈哈哈哈虽然你们失去的是工资，但是我们收获的是快乐哈哈哈哈哈哈哈哈哈
            </div>
            <div class="user">
              <span class="name">1</span>
              <span class="time">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Banner from '../home/banner.vue';
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  min-height: 100vh;
  padding-top: 70px;
  background: #fff;
  .video-wrap {
    width: 1200px;
    margin: 0 auto;
    .category {
      width: 100%;
      height: 100px;
      background: red;
    }
    .recommend-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 24px;
      .recommend-carousel {
        width: 560px;
        height: 400px;
        margin-right: 10px;
        background: #fff;
      }
      .recommend-box {
        flex: 1;
        width: 100%;
        display: grid;
        grid-gap: 20px 12px;
        grid-column: span 3;
        grid-template-columns: repeat(3, 1fr);
        .recommend-item {
          width: 100%;
          overflow: hidden;
          cursor: pointer;
          img {
            width: 100%;
            height: 145px;
            border-radius: 5px;
          }
          .title {
            width: 100%;
            height: 48px;
            margin-top: 10px;
            font-size: 15px;
            display: -webkit-box !important;
            overflow: hidden;
            word-break: break-all;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            transition: all 0.5s;
            color: #18191c;
            &:hover {
              color: var(--Yuexing-color);
            }
          }

          .user {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-top: 4px;
            color: #9499a0;
            &:hover {
              color: var(--Yuexing-color);
            }
            .name {
              display: -webkit-box;
              overflow: hidden;
              -webkit-box-orient: vertical;
              text-overflow: -o-ellipsis-lastline;
              text-overflow: ellipsis;
              word-break: break-word !important;
              word-break: break-all;
              line-break: anywhere;
              -webkit-line-clamp: 1;
              display: inline-flex;
            }
            .time {
              margin-left: 4px;
            }
          }
        }
      }
    }
  }
}
</style>
