<template>
  <div class="content-right">
    <div class="sign-btn">
      <n-button
        class="btn"
        type="primary"
        disabled
        v-if="isSign"
        block
        size="large"
        color="#8fc1a7"
      >
        今日已签到
      </n-button>
      <n-button
        class="btn"
        type="primary"
        v-else
        block
        size="large"
        @click="emtis('handleSignClick')"
      >
        立即签到
      </n-button>
    </div>
    <div class="divide"></div>
    <div class="sign-rank">签到活跃榜-TOP</div>
    <n-tabs type="line" animated>
      <n-tab-pane name="最新签到" tab="最新签到">
        <SignRankItem v-for="(item, index) in state.newList" :item="item" :index="index" />
      </n-tab-pane>
      <n-tab-pane name="今日最快" tab="今日最快">
        <SignRankItem v-for="(item, index) in state.todayList" :item="item" :index="index" />
      </n-tab-pane>
      <n-tab-pane name="签到总榜" tab="签到总榜">
        <SignRankItem v-for="(item, index) in state.rankList" :item="item" :index="index" />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script lang="ts" setup>
import { getSignNew, getSignToday, getSignRank } from '@/api/sign';

import SignRankItem from './signRankItem.vue';
interface IProps {
  isSign: boolean;
}

withDefaults(defineProps<IProps>(), {});

const emtis = defineEmits(['handleSignClick']);

const state = reactive({
  newList: [],
  todayList: [],
  rankList: [],
});

const [newList, todayList, rankList] = await Promise.all([
  getSignNew(),
  getSignToday(),
  getSignRank(),
]);
state.newList = newList.data.value;
state.todayList = todayList.data.value;
state.rankList = rankList.data.value;
</script>

<style lang="less" scoped>
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
  .sign-rank {
    font-size: 16px;
    background: #e5e8ef;
    padding: 10px 0px 10px 5px;
    color: #1abc9c;
  }
}
</style>
