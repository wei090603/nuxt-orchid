<template>
  <div class="part_mor">
    <!-- 标题 -->
    <div class="title">
      <i class="iconfont icon-aixin1"></i>
      <span>相关推荐</span>
    </div>

    <!-- 内容 -->
    <div class="box">
      <div class="item">
        <a href="javascript:;">
          <img
            src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e7d37251bc04bf48caafe62eae2991e~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?"
            alt=""
          />
          <span>大厂裁员下，程序员如何做“副业”？</span>
        </a>
      </div>

      <div class="item">
        <a href="javascript:;">
          <img
            src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a492eddea7c44d70be5429f50762a228~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?"
            alt=""
          />
          <span>2022，前端的天🌦️要怎么变？</span>
        </a>
      </div>

      <div class="item">
        <a href="javascript:;">
          <img
            src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11662ac0c4904deea3269e3ca70a6b06~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?"
            alt=""
          />
          <span>什么？一道《数组去重》面试题竟然切屏34次！</span>
        </a>
      </div>

      <div class="item">
        <a href="javascript:;">
          <img
            src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe13aa9b39484dedb11826d77251ceb0~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?"
            alt=""
          />
          <span>大菠萝？Pinia已经来了，再不学你就out了</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.part_mor {
  width: 100%;
  margin-top: 20px;
  padding: 20px;
  background: #fff;
  .title {
    padding-bottom: 15px;
    font-size: 18px;
    border-bottom: 1px solid #ededed;
    i {
      font-size: 18px;
    }
  }
  .box {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .item {
      width: 210px;
      padding: 15px;
      border-radius: 5px;
      box-shadow: 1px 1px 3px 0px rgb(108 108 108 / 22%);
      img {
        width: 100%;
        border-radius: 5px;
      }
      span {
        width: 100%;
        margin: 10px 0;
        font-size: 15px;
        display: -webkit-box !important;
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        transition: all 0.5s;
      }
      &:hover span {
        color: #539dfd;
      }
    }
  }
}
</style>
