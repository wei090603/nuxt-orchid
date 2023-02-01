<template>
  <div class="container">
    <div class="question-wrap">
      <div class="card main-column">
        <ul class="question">
          <li class="question-item" v-for="item in 10">
            <div class="question-content">
              <div class="user-info">
                <img
                  src="https://picx.zhimg.com/v2-d41c2ceaed8f51999522f903672a521f_l.jpg?source=117bd250"
                  class="avatar"
                />
                <div class="cmiksn">
                  <div class="name">匿名用户 的提问</div>
                  <div class="date">1 天前</div>
                  <div class="wait">期待你的回答</div>
                </div>
              </div>
              <div class="content">
                <nuxt-link :to="{ path: '/question/1' }">
                  <div class="text">前端程序员如何使用节点操作隐藏一个 dom 元素？</div>
                </nuxt-link>
                <div class="css-190zqi3"></div>
              </div>
              <div class="help">
                <div class="css-zkfaav">试试帮他解答~ · 0 回答 · 0 关注</div>
              </div>
            </div>
            <div class="question-btn">
              <nuxt-link :to="{ path: '/question/1' }" class="btn">写回答</nuxt-link>
            </div>
          </li>
        </ul>
      </div>
      <CommunityAside />
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
  padding-top: 70px;
  .question-wrap {
    display: flex;
    margin: 0 auto;
    width: 1000px;
  }
  .main-column {
    flex: 1;
    align-self: flex-start;
    .question {
      padding: 0 20px;
      .question-item {
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        display: flex;
        padding: 22px 0px;
        border-bottom: 1px solid rgb(235, 235, 235);
        position: relative;
        .question-content {
          flex: 1;
          .user-info {
            margin: 0px 0px 12px;
            min-width: 0px;
            color: rgb(133, 144, 166);
            -webkit-box-align: center;
            align-items: center;
            display: flex;
            font-size: 15px;
            .avatar {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              margin-right: 8px;
            }
            .cmiksn {
              box-sizing: border-box;
              margin: 0px 6px 0px 0px;
              min-width: 0px;
              -webkit-box-align: center;
              align-items: center;
              display: flex;
              color: rgb(68, 68, 68);
              font-size: 14px;
              .name {
              }
              .date {
                color: rgb(153, 153, 153);
                margin-left: 6px;
              }
              .wait {
                color: rgb(153, 153, 153);
                margin-left: 6px;
              }
            }
          }
          .content {
            width: 100%;
            margin-bottom: 10px;
            .text {
              display: -webkit-box;
              text-overflow: ellipsis;
              overflow: hidden;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              font-size: 15px;
              color: rgb(68, 68, 68);
              font-weight: 500;
              line-height: 21px;
            }
          }
          .help {
            color: rgb(153, 153, 153);
            font-size: 14px;
          }
        }
        .question-btn {
          .btn {
            display: inline-block;
            font-size: 14px;
            width: 96px;
            height: 28px;
            line-height: 26px;
            border-radius: 3px;
            color: rgb(255, 255, 255);
            padding: 0px;
            border: 1px solid var(--Yuexing-color);
            background-color: var(--Yuexing-color);
            box-sizing: border-box;
            text-align: center;
          }
        }
      }
    }
  }
  .card {
    background: #fff;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px hsla(0, 0%, 7%, 0.1);
    box-shadow: 0 1px 3px hsla(0, 0%, 7%, 0.1);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>
