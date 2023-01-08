<template>
  <div class="nav-menu">
    <div class="l">
      <div class="item">
        <span class="icon"><i class="iconfont icon-shouye"></i></span>
        <span class="label">兰苑主页</span>
      </div>
      <div class="item">
        <span class="icon"><i class="iconfont icon-remen"></i></span>
        <span class="label">兰草热卖</span>
      </div>
      <div class="item">
        <span class="icon"><i class="iconfont icon-shipin1"></i></span>
        <span class="label">视频推荐</span>
      </div>
      <div class="item">
        <span class="icon"><i class="iconfont icon-16"></i></span>
        <span class="label">文章推荐</span>
      </div>
      <div class="item">
        <span class="icon"><i class="iconfont icon-huodongbiaoqian"></i></span>
        <span class="label">活动专区</span>
      </div>
    </div>
    <div class="r">
      <span class="icon"><i class="iconfont icon-paixingbang"></i></span>
      <span>排行榜</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
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
  .l {
    display: flex;
    align-items: center;
    .item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 2px;
        height: 10px;
        background: #c7c7c7;
      }
      &:first-child {
        &::before {
          content: '';
          display: none;
        }
        .icon {
          margin-left: 0px;
        }
      }
      .label {
        padding-left: 5px;
        padding-right: 15px;
      }
      .icon {
        margin-left: 15px;
        i {
          color: var(--Yuexing-color);
          font-size: 18px;
        }
      }
    }
  }
  .r {
    display: flex;
    align-items: center;
    .icon {
      margin-right: 2px;
      i {
        // color: #ed433f;
        color: var(--Yuexing-color);
        font-size: 18px;
      }
    }
  }
}
</style>
