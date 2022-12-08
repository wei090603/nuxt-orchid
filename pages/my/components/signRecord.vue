<template>
  <div class="content-body">
    <div class="first-line">
      <div class="time">
        <span @click="handleSwitchMonthClick('prev')">《</span>
        <span class="time-label">{{ currentYear }}年 {{ currentMonth }}月</span>
        <span @click="handleSwitchMonthClick('next')">》</span>
      </div>
    </div>

    <div class="week">
      <div class="weekday" v-for="item in week" :key="item">{{ item }}</div>
    </div>

    <div class="day-container">
      <template v-for="item in dataCount">
        <div
          class="calendar-day day"
          v-if="item.value > 0"
          :class="{ 'today-miss': item.isCurrentDate, 'pre-signed': item.status === 2 }"
          @click="handleSignClick(item.value)"
        >
          <span class="dot" v-if="item.status === 2">✔</span>
          <div class="future-day universal">
            <span class="figure bold" :class="{ 'back-blue': item.isCurrentDate }">
              {{ item.value }}
            </span>
            <span class="add-mine-stone gray" v-if="item.status === 2">+{{ item.favs }}</span>
            <span class="plain-text clickable" v-if="item.status === 3 && !item.isCurrentDate">
              未签到
            </span>
            <span class="plain-text" v-if="item.isCurrentDate && item.status !== 2">今日</span>
            <!-- <span class="add-mine-stone gray">+512</span> -->
          </div>
        </div>
        <div class="blank-box" v-else></div>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
.content-body {
  padding-top: 10px;

  .first-line {
    font-size: 20px;
    color: #1d2129;
    line-height: 28px;
    font-weight: 500;
    margin-bottom: 24px;
  }
  .week {
    display: flex;
    margin-bottom: 16px;
    .weekday {
      width: 72px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #86909c;
      margin-right: 12px;
      font-size: 16px;
      border-radius: 2px;
    }
  }
  .day-container {
    display: flex;
    flex-wrap: wrap;
    .blank-box {
      flex: none;
      width: 72px;
      height: 68px;
      margin-right: 12px;
      margin-bottom: 16px;
      border-radius: 2px;
    }
    .day {
      position: relative;
      flex: none;
      width: 72px;
      height: 68px;
      margin-right: 12px;
      margin-bottom: 16px;
      border-radius: 2px;
      background: #f2f3f6;
      &.today-miss {
        cursor: pointer;
        background-color: #e8f3ff;
      }

      &.pre-signed {
        background-color: #e8f3ff;
        position: relative;
      }

      .dot {
        position: absolute;
        top: 2px;
        right: 2px;
        color: greenyellow;
      }
      .universal {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 2px;

        .figure {
          color: #1d2129;
          font-size: 20px;
          line-height: 28px;
          font-weight: 400;
          margin-bottom: 2px;
          &.bold {
            font-weight: 500;
          }
          &.back-blue {
            color: #fff;
            background-color: #1abc9c;
            border-radius: 50px;
            width: 28px;
            height: 28px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
