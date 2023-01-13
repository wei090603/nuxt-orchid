import { Ref, ref } from 'vue';

import { IAwardItem, ILotteryResult } from '@/types/lottery';

interface ILotteryResp {
  awardGrade: string;
  awardId: string | number; // 中奖结果对应的奖品
  awardName: string; // 奖品名
  awardUrl: string; // 奖品图片
  awardType: string;
}

function useStartLottery(
  getAwards: () => IAwardItem[],
  lotteryFn: () => Promise<ILotteryResp>
): {
  lotteryResult: Ref<ILotteryResult>;
  startLottery(): Promise<ILotteryResult>;
} {
  const lotteryResult = ref<ILotteryResult>({
    awardGrade: 0,
    awardId: 0, // 中奖结果对应的奖品
    awardName: '', // 奖品名
    awardUrl: '', // 奖品图片
    awardType: 0,
    result: 0, // 0 未中奖，1 中奖
  });

  const startLottery = () =>
    lotteryFn().then((lotteryResp) => {
      const awardType = parseInt(lotteryResp.awardType, 10);
      let awardGrade = parseInt(lotteryResp.awardGrade, 10);
      let result: 0 | 1 = 1;
      // 如果中奖的奖品类型为谢谢参与，则显示修改中奖结果为未中奖
      if (awardType === 3) {
        result = 0;
      }
      const awards = getAwards();
      const award = awards.find((item) => item.awardGrade === awardGrade);
      if (!award) {
        // 中奖奖品不在当前九宫格，则中奖等级为-1
        awardGrade = -1;
      }
      lotteryResult.value = {
        ...lotteryResp,
        awardGrade,
        awardType,
        result,
        ...award,
      };
      return lotteryResult.value;
    });

  return {
    startLottery,
    lotteryResult,
  };
}

export default useStartLottery;
