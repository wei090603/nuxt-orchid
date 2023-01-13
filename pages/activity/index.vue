<template>
  <div class="container">
    <div class="activity-wrap">
      <ul class="activity-list">
        <li class="activity-item" v-for="item in 9">
          <nuxt-link class="activity" :to="{ path: '/activity/1' }" target="_blank">
            <div class="activity-inner">
              <div class="banner"></div>
              <div class="message">
                <div class="title">「点评活动」你是如何看待图数据库</div>
                <div class="date">
                  <span class="icon icon-calendar"></span>
                  <span>12-12 周一</span>
                </div>
                <div class="bottom">
                  <div class="address">
                    <span class="icon icon-location"></span>
                    <span>线上</span>
                  </div>
                  <div class="btn-join">立即参加</div>
                </div>
              </div>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.container {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
  padding-top: 70px;
  .activity-wrap {
    width: 100%;
    .activity-list {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 13px;
      width: 100%;
      flex-flow: row wrap; /*按照行排列，一行排不下换行。flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。*/
      .activity-item {
        width: calc((100% - 56px) / 4);
        height: auto;
        border-radius: 20px;
        margin: 0 7px 30px;
        .activity {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          transition: all 0.2s linear;
          &:hover {
            transform: translateY(-3px);
            &::before {
              box-shadow: 0 7px 15px rgba(0, 0, 0, 0.1);
            }
          }
          &::before {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: -1;
            border-radius: 2px;
            overflow: hidden;
            background-color: #fff;
            box-shadow: 1px 1px 1px rgb(0 0 0 / 15%);
          }
          .activity-inner {
            border-radius: 2px;
            overflow: hidden;
            color: #333;
            background: #fff;
            .banner {
              width: 100%;
              height: 135px;
              background-image: url('https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ac5a83f16334b4a96948cccdd44c322~tplv-k3u1fbpfcp-no-mark:460:460:460:270.awebp?');
              background-size: cover;
            }
            .message {
              padding: 20px 12px 15px;
              .title {
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                height: 40px;
                font-size: 14px;
                font-weight: 700;
              }
              .date {
                margin-top: 6px;
              }
              .bottom {
                margin-top: 6px;
                display: flex;
                justify-content: space-between;
                .btn-join {
                  width: 100px;
                  height: 25px;
                  border-radius: 30px;
                  background-color: var(--Yuexing-color);
                  line-height: 25px;
                  color: #fff;
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
