export interface IAwardItem {
  awardId: string | number;
  awardName: string;
  awardImgUrl: string;
  awardGrade: number;
  awardType: number;
}

export interface IWinningUser {
  nickname: string;
  awardName: string;
}

export interface ILotteryResult {
  awardGrade: number; // 中了几等奖
  awardId: string | number; // 奖品id
  awardName: string; // 奖品名
  awardType: number; // 奖品类型
  awardUrl?: string; // 奖品图片
  result: 0 | 1; // 是否中奖
}
