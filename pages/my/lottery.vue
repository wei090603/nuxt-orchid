<template>
  <div class="wrapper">
    <div class="lottery-container">
      <div class="lottery-wrap">
        <div id="rules-box" class="lotteryrules_container rules-box">抽奖规则 ></div>
        <img src="@/assets/images/lottery_bg.png" class="background" />
        <div class="tit-box">
          <h2>兰苑福利限量抽</h2>
          <p>惊喜大奖等你来拿</p>
        </div>
        <div class="main">
          <div class="lottery-box">
            <div class="left-part">
              <div class="title-box">
                <p class="title">幸运大转盘</p>
                <div class="tosignin done">已签到</div>
              </div>
              <NineLottery
                :awards="awards"
                :checkLottery="checkLottery"
                :startLottery="startLottery"
                @lotteryEnd="handleLotteryEnd"
              />
            </div>
            <div class="right-part">
              <p class="title">中奖播报</p>
              <div class="winning-list">
                <div class="content">
                  <div class="item">
                    <p class="message">
                      🎉
                      <span class="txt">恭喜</span>
                      <span class="username">用户5962...</span>
                      <span class="txt">抽中随机矿石</span>
                    </p>
                    <p class="date">2023-01-12</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NineLottery from './components/nineLottery.vue';

const point = 1000;
// 抽奖次数
const lotteryCount = computed(() => parseInt(String(point / 100), 10));

const resultVisible = ref<boolean>(false);

const checkLottery = () => lotteryCount.value > 0;

// 获取奖项
const awards = useAwardList();

// 抽奖
const { startLottery } = useStartLottery(
  () => awards.value,
  () =>
    Promise.resolve({
      awardGrade: `${awards.value[2].awardGrade + ''}`,
      awardId: awards.value[2].awardId, // 中奖结果对应的奖品
      awardName: awards.value[2].awardName, // 奖品名
      awardUrl: `${awards.value[2].awardImgUrl}`, // 奖品图片
      awardType: `${+awards.value[2].awardType}`,
    })
);

const handleLotteryEnd = () => {
  console.log('抽奖完成');
  resultVisible.value = true;
};
</script>

<style lang="less" scoped>
.lottery-container {
  min-height: calc(100vh - 100px);
  .lottery-wrap {
    width: 100%;
    min-height: inherit;
    position: relative;
    background: #568fff;
    border-radius: 2px;
    overflow: hidden;
    .rules-box {
      position: absolute;
      right: 0;
      top: 16px;
      z-index: 10;
      &.lotteryrules_container {
        width: 100px;
        height: 32px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.24);
        border-radius: 50px 0 0 50px;
        color: #b2d0fc;
        font-size: 14px;
        padding-left: 14px;
        cursor: pointer;
        transition: color 0.3s;
      }
    }
    .background {
      position: absolute;
      background: #2c68ff;
      top: 0;
      left: 0;
      width: 100%;
    }
    .tit-box {
      position: relative;
      padding-top: 70px;
      z-index: 9;
      h2 {
        font-size: 48px;
        text-align: center;
        color: #fff;
      }
      p {
        font-size: 18px;
        line-height: 24px;
        text-align: center;
        color: #e8f3ff;
        text-shadow: 0 2px 2px rgb(0 0 0 / 24%);
        margin: 24px 0 0;
      }
    }
    .main {
      position: relative;
      z-index: 9;
      padding: 16px 28px 72px;
      .lottery-box {
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
        .title {
          position: relative;
          padding-left: 20px;
          font-size: 20px;
          line-height: 28px;
          color: #fadd95;
          margin: 0;
          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            margin: auto 0;
            width: 8px;
            height: 20px;
            display: block;
            border-radius: 50px;
            background: #e37815;
          }
        }
        .left-part {
          width: 500px;
          flex-shrink: 0;
          margin-right: 28px;
          .title-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 28px;
            margin-bottom: 18px;
            overflow: hidden;
            .tosignin {
              display: flex;
              align-items: center;
              font-size: 16px;
              color: #fff7e8;
              transition: color 0.3s;
              margin-right: 2px;
              .tosignin:not(.done) {
                cursor: pointer;
              }
              &:hover {
                color: #b2d0fc;
              }
              &.done {
                color: #b2d0fc;
              }
            }
          }
        }
        .right-part {
          flex: 1;
          flex-shrink: 0;
          .winning-list {
            width: 100%;
            margin-top: 18px;
            background: rgba(255, 247, 232, 0.16);
            box-shadow: inset 0 0 20px rgba(255, 247, 232, 0.4);
            border-radius: 12px;
            box-sizing: border-box;

            .content {
              padding: 15px;
              .item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 8px;
                font-size: 14px;
                line-height: 22px;
                color: #fff;
                &:last-child {
                  padding-bottom: 0px;
                }
                p {
                  margin: 0;
                }
                .message {
                  display: flex;
                  align-items: center;
                  overflow: hidden;
                  flex: 1;
                  margin-right: 10px;
                }
                .date {
                  color: #e8f3ff;
                  flex: 0 0 auto;
                }
                .txt {
                  flex: 0 0 auto;
                  padding-left: 5px;
                }
                .username {
                  color: #fadd95;
                  padding-left: 5px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  word-break: break-all;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
