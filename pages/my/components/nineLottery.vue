<template>
  <div class="nine-grid">
    <div class="lottery-box">
      <div
        class="lottery-item"
        v-for="item in awards"
        :key="item.awardId"
        :class="{ active: item.awardGrade === state.currentID }"
      >
        <img :src="item.awardImgUrl" />
        <span>{{ item.awardName }}</span>
      </div>
      <button class="draw-btn" @click="handleClickStartLottery">
        <span>点击</span>
        <span>抽奖</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { useMessage } from 'naive-ui';

import { IAwardItem, ILotteryResult } from '@/types/lottery';

interface IState {
  awardGrade: number; // 中奖位置
  currentID: number; // 当前转动到哪个位置，起点位置
  timer: ReturnType<typeof setTimeout> | undefined; // 转动定时器
  speed: number; // 初始转动速度
  times: number; // 转动次数
  cycle: number; // 转动基本次数：至少需要转动多少次再进入抽奖环节
  isLotterying: boolean;
}

const props = defineProps({
  checkLottery: {
    type: Function as PropType<() => boolean>,
    required: true,
  },
  startLottery: {
    type: Function as PropType<() => Promise<ILotteryResult>>,
    required: true,
  },
  awards: {
    type: Object as PropType<IAwardItem[]>,
    required: true,
  },
});

const message = useMessage();

const emit = defineEmits<{ (e: 'lotteryStart'): void; (e: 'lotteryEnd'): void }>();

const state = reactive<IState>({
  awardGrade: -1, // 中奖位置
  currentID: 0, // 当前转动到哪个位置，起点位置
  timer: undefined, // 转动定时器
  speed: 200, // 初始转动速度
  times: 0, // 转动次数
  cycle: 50, // 转动基本次数：至少需要转动多少次再进入抽奖环节
  isLotterying: false,
});
const canLottery = computed(() => props.awards.length !== 0 && props.checkLottery());

const onAwardFinish = () => {
  emit('lotteryEnd');
  state.isLotterying = false;
};
/**
 * 抽奖动画
 */
function startRoll() {
  state.times += 1; // 转动次数
  state.currentID = state.currentID === 8 ? 1 : (state.currentID += 1);
  // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
  if (state.times > state.cycle + 10 && state.awardGrade === state.currentID) {
    clearTimeout(state.timer); // 清除转动定时器，停止转动
    state.awardGrade = -1;
    state.times = 0;
    state.speed = 200;
    setTimeout(() => {
      onAwardFinish();
    }, 200);
  } else {
    if (state.times < state.cycle) {
      // 加快转动速度
      state.speed -= 10;
    } else if (
      state.times > state.cycle + 10 &&
      ((state.awardGrade === 1 && state.currentID === 8) ||
        state.awardGrade === state.currentID + 1)
    ) {
      // 最后一次转动速度骤减
      state.speed += 120;
    } else {
      state.speed += 20;
    }
    state.speed = state.speed < 40 ? 40 : state.speed;
    state.timer = setTimeout(startRoll, state.speed);
  }
}

/**
 * 开始抽奖
 */
const handleClickStartLottery = async () => {
  if (state.isLotterying) {
    return;
  }
  if (!canLottery.value) {
    message.error('抽奖次数不足');
    return;
  }
  emit('lotteryStart');
  state.isLotterying = true;
  try {
    const result = await props.startLottery();
    if (result.awardGrade < 0) {
      // 中奖奖品不在当前九宫格，则无动画，直接展示中奖的提示
      onAwardFinish();
      return;
    }
    state.awardGrade = result.awardGrade;
    // 开始抽奖动画
    startRoll();
  } catch (err) {
    state.isLotterying = false;
  }
};

defineExpose({
  handleClickStartLottery,
});
</script>

<style lang="less" scoped>
.nine-grid {
  position: relative;
  width: 500px;
  height: 500px;
  border-radius: 34px;
  padding: 20px;
  background: url(/_nuxt/assets/images/lights.png) no-repeat center #4fc6f4;
  background-size: 102% 102%;
  .lottery-box {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    @size: 154px;
    .lottery-item {
      position: absolute;
      width: calc((100% - 4px) / 3);
      height: calc((100% - 4px) / 3);
      padding-top: 12px;
      text-align: center;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        color: #00b0f0;
        font-size: 0.14rem;
        font-weight: bold;
      }
      &:nth-child(1) {
        left: 0px;
        top: 0px;
        border-top-left-radius: 20px;
      }
      &:nth-child(2) {
        left: @size;
        top: 0px;
      }
      &:nth-child(3) {
        right: 0px;
        top: 0px;
        border-top-right-radius: 20px;
      }
      &:nth-child(4) {
        top: @size;
        right: 0px;
      }
      &:nth-child(5) {
        right: 0px;
        bottom: 0px;
        border-bottom-right-radius: 20px;
      }
      &:nth-child(6) {
        left: @size;
        bottom: 0px;
      }
      &:nth-child(7) {
        left: 0px;
        bottom: 0px;
        border-bottom-left-radius: 20px;
      }
      &:nth-child(8) {
        left: 0px;
        top: @size;
      }
      &.active {
        background: #ffe468;
        span {
          color: #fff;
        }
      }
    }
    .draw-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 152px;
      height: 152px;
      border: none;
      background: rgba(255, 255, 255, 0.3);
      font-size: 40px;
      padding: 0;
      letter-spacing: 5px;
      cursor: pointer;
      color: #fff;

      span {
        display: block;
        // line-height: 100px;
      }
    }
  }
}
</style>
