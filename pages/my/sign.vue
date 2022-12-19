<template>
  <div class="wrapper-sign">
    <div class="tab-header">
      <span class="title">每日签到</span>
      <div class="rules">签到规则</div>
    </div>

    <div class="signin-content">
      <div class="content-left"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NTooltip, NButton, NTabs, NTabPane } from 'naive-ui';
import { sign, getSignRecord, getSignInfo } from '@/api/user';

const userInfo = useUserInfo();

const isSign = ref(userInfo.value?.isSign);

const totalPoint = ref(userInfo.value?.favs);
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
    if (currentMonth.value === 1) {
      currentYear.value = currentYear.value - 1;
      currentMonth.value = 12;
    } else {
      currentMonth.value--;
    }
  } else {
    if (currentMonth.value === 12) {
      currentYear.value = currentYear.value + 1;
      currentMonth.value = 1;
    } else {
      currentMonth.value++;
    }
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

.signin-content {
  display: flex;
  justify-content: space-between;
  padding: 20px 32px 32px;
  .content-left {
    width: 600px;
  }
}
</style>
