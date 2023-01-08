<template>
  <div class="rank-box">
    <ul class="rank-list">
      <li class="rank-item" v-for="(item, index) in 10">
        <div class="rank-item-wrap">
          <span class="item-index" :index="item">{{ item }}</span>
          <NuxtLink :class="{ 'rank-item-card': index === 0 }">
            <div class="item-image" v-if="index === 0">
              <picture class="item-card-cover">
                <img src="" alt="" />
              </picture>
            </div>
            <div class="item-info">
              <h3 class="item-tit">aaa</h3>
            </div>
          </NuxtLink>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.rank-box {
  position: relative;
  width: 100%;
  margin-bottom: 15px;
  .rank-list {
    border: 1px solid #f1f2f3;
    border-radius: 6px;
    background-color: #f6f7f8;
    overflow: hidden;
    height: 100%;
    .rank-item {
      position: relative;
      width: 100%;
      height: 48px;
      padding: 0 8px;
      &:first-child {
        height: auto;
      }
      &:nth-child(2n) {
        background: #f6f7f8;
      }
      &:nth-of-type(2n + 1) {
        background: #fff;
      }
      .rank-item-wrap {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
        .item-index {
          margin-right: 6px;
          width: 20px;
          font-family: Avenir;
          font-style: italic;
          text-align: center;
          font-weight: 600;
          color: #c9ccd0;
        }
        [index='1'] {
          color: #ff473d;
        }
        [index='2'] {
          color: #ff6a29;
        }
        [index='3'] {
          color: #ff9214;
        }
        .rank-item-card {
          display: flex;
          justify-content: flex-start;
          align-items: stretch;
          min-width: 0;
          flex: 1;
          padding: 15px 0;
          width: 100%;
          color: #18191c;
        }
        .item-image {
          margin-right: 6px;
          width: 90px;
          height: 56px;
          .item-card-cover {
            width: 90px;
            height: 56px;
            border-radius: 4px;
            background-color: #f1f2f3;
            overflow: hidden;
            object-fit: cover;
            img {
              display: block;
              width: 100%;
              height: 100%;
              object-fit: inherit;
            }
          }
        }
        .item-info {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-direction: column;
          min-width: 0;
          flex: 1;

          .item-tit {
            color: #18191c;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
