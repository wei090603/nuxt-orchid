<template>
  <div class="figures">
    <div class="figure-card mini-card">
      <span class="figure active">{{ signContinuousCount }}</span>
      <div class="attention">
        <span class="text">连续签到天数</span>
      </div>
    </div>
    <div class="figure-card mid-card web-only">
      <span class="figure">{{ signCount }}</span>
      <div class="attention">
        <span class="text">累计签到天数</span>
      </div>
    </div>
    <div class="divide web-only"></div>
    <div class="figure-card large-card">
      <span class="figure">{{ totalPoint }}</span>
      <div class="attention">
        <span class="text">当前积分数</span>
        <span class="tooltip web-only">
          <n-tooltip placement="bottom" trigger="hover" :style="{ maxWidth: '240px' }">
            <template #trigger>
              <n-button>提示图标</n-button>
            </template>
            积分是兰苑内通用积分，用户可通过完成各种任务获得，暂无使用期限限制。
          </n-tooltip>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.figures {
  display: flex;
  flex-shrink: 0;
  min-width: 576px;
  justify-content: space-between;
  background-color: #f7f8fa;
  border-radius: 2px;
  padding: 24px;
  box-sizing: border-box;
  .figure-card {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    .figure {
      font-weight: 700;
      font-size: 36px;
      color: #1d2129;
      line-height: 36px;
      font-family: DIN Alternate;
      white-space: nowrap;
      margin-right: 12px;
      position: relative;
      top: 1px;
      &.active {
        color: #1abc9c;
      }
    }
  }
}
</style>
