<template>
  <div class="wrapper-sign">
    <div class="tab-header">
      <span class="title">每日签到</span>
      <div class="rules">签到规则</div>
    </div>

    <div class="signin-content">
      <div class="content-left">
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
                  <span
                    class="plain-text clickable"
                    v-if="item.status === 3 && !item.isCurrentDate"
                  >
                    未签到
                  </span>
                  <span class="plain-text" v-if="item.isCurrentDate && item.status !== 2">
                    今日
                  </span>
                  <!-- <span class="add-mine-stone gray">+512</span> -->
                </div>
              </div>
              <div class="blank-box" v-else></div>
            </template>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="sign-btn">
          <n-button class="btn" type="primary" v-if="isSign" block size="large" color="#8fc1a7">
            今日已签到
          </n-button>
          <n-button class="btn" type="primary" v-else block size="large" @click="handleSignClick()">
            立即签到
          </n-button>
        </div>
        <div class="divide"></div>
        <n-tabs type="line" animated>
          <n-tab-pane name="oasis" tab="Oasis">Wonderwall</n-tab-pane>
          <n-tab-pane name="the beatles" tab="the Beatles">Hey Jude</n-tab-pane>
          <n-tab-pane name="jay chou" tab="周杰伦">七里香</n-tab-pane>
        </n-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NTooltip, NButton, NTabs, NTabPane } from 'naive-ui';
import { sign, getSignRecord, getSignInfo } from '@/api/user';

const userInfo = useUserInfo();

const isSign = ref(userInfo.value.isSign);

const totalPoint = ref(userInfo.value.favs);
// 连续签到天数
const signContinuousCount = ref(0);
// 签到总数
const signCount = ref(0);

const date = new Date();

const currentYear = ref(date.getFullYear());
const currentMonth = ref(date.getMonth() + 1);
const currentDate = ref(date.getDate()); //获取当前日(1-31)
const currentDay = ref(date.getDay()); // 星期几
// 固定月份
const fixedMonth = new Date().getMonth() + 1;

// 固定日期
const fixedDate = new Date().toLocaleDateString().replace(/\//g, '-');

console.log(userInfo.value, currentMonth.value, 'userInfo');

// const { pending, data: signList, error, refresh } = await signRecord();

const [signRecord, signInfo] = await Promise.all([
  getSignRecord({ month: currentMonth.value }),
  getSignInfo(),
]);

const dataCount = ref([]);

const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const handleSignClick = async (value?: number) => {
  if (!value || isCurrentDate(value)) {
    await sign();
    isSign.value = true;
    await signRecord.refresh();
    getDateCount();
  }
};

const getDateCount = () => {
  dataCount.value = [];
  const count = new Date(currentYear.value, currentMonth.value, 0).getDate();
  const firstWeekDay = new Date(currentYear.value, currentMonth.value - 1, 1).getDay();

  for (let i = 1; i <= count + firstWeekDay; i++) {
    const val = i - firstWeekDay;
    if (val > 0) {
      dataCount.value.push({
        value: val, // 数值
        // isSign: isSignList(val), // 是否签到
        status: dateListStatus(val), // 对应状态
        favs: changeSignFav(val), // 签到获得积分
        isCurrentDate: isCurrentDate(val),
      });
    } else {
      dataCount.value.push({ value: val });
    }
  }
};

// 是否当前日
const isCurrentDate = (date: number) => {
  return date === currentDate.value && fixedMonth === currentMonth.value ? true : false;
};

// 切换月份
const handleSwitchMonthClick = (type: string) => {
  if (type === 'prev') {
    currentMonth.value--;
  } else {
    currentMonth.value++;
  }
  getDateCount();
};

// 日期是否签到
const isSignList = (date: string) => {
  return signRecord.data.value.some((item) => item.createdAt === date);
};

// 获取签到积分
const changeSignFav = (date: number) => {
  const day = date < 10 ? `0${date}` : date;
  return (
    signRecord.data.value.find(
      (item) => item.createdAt === `${currentYear.value}-${currentMonth.value}-${day}`
    )?.favs || 0
  );
};

// 日期对应状态
const dateListStatus = (date: number) => {
  // 传入的年月日
  const day = date < 10 ? `0${date}` : date;
  const currentDate = `${currentYear.value}-${currentMonth.value}-${day}`;

  // 传过来日期大于当前日期 计算应该获取的对应积分
  if (currentDate > fixedDate) {
    return 1; // 大于当前日期
  } else {
    // 小于当前日期 并且签到
    if (isSignList(currentDate)) {
      return 2;
    } else {
      // 小于当前日期 没有签到
      return 3;
    }
  }
};

onMounted(() => {
  getDateCount();

  signContinuousCount.value = signInfo.data.value.continuousCount;
  signCount.value = signInfo.data.value.signCount;
});
</script>

<style lang="less" scoped>
.wrapper-sign {
  min-height: 100%;
}

.tab-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 16px;
  border-bottom: 1px solid #e5e6eb;
  .title {
    white-space: nowrap;
    font-size: 18px;
    font-weight: 500;
    color: #1d2129;
  }
  overflow: hidden;
  .rules {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: #4e5969;
    cursor: pointer;
    white-space: nowrap;
  }
}

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

.signin-content {
  display: flex;
  justify-content: space-between;
  padding: 20px 32px 32px;
  .content-left {
    width: 600px;
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
  }
  .content-right {
    flex: 0 0 auto;
    width: 280px;
    .sign-btn {
      height: 56px;
      margin-top: 22px;
      .btn {
        height: 56px;
        border-radius: 4px;
        font-size: 18px;
        font-weight: 500;
      }
    }
    .divide {
      border-bottom: 1px solid #e5e8ef;
      margin: 32px 0 23px;
    }
  }
}
</style>
