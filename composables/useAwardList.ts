import { onMounted, Ref, ref } from 'vue';

import { IAwardItem } from '@/types/lottery';

import point from '@/assets/images/point.png';
import thanks from '@/assets/images/thanks.png';

function useAwardList(): Ref<IAwardItem[]> {
  const awardList = ref<IAwardItem[]>([]);

  onMounted(() => {
    awardList.value = [
      {
        awardId: 457,
        awardName: '得分20',
        awardImgUrl: point,
        awardGrade: 1,
        awardType: 2,
      },
      {
        awardId: 458,
        awardName: '谢谢参与',
        awardImgUrl: thanks,
        awardGrade: 2,
        awardType: 0,
      },
      {
        awardId: 459,
        awardName: '得分200',
        awardImgUrl: point,
        awardGrade: 3,
        awardType: 0,
      },
      {
        awardId: 460,
        awardName: '谢谢参与',
        awardImgUrl: thanks,
        awardGrade: 4,
        awardType: 0,
      },
      {
        awardId: 461,
        awardName: '得分200',
        awardImgUrl: point,
        awardGrade: 5,
        awardType: 5,
      },
      {
        awardId: 462,
        awardName: '谢谢参与',
        awardImgUrl: thanks,
        awardGrade: 6,
        awardType: 5,
      },
      {
        awardId: 463,
        awardName: '得分20',
        awardImgUrl: point,
        awardGrade: 7,
        awardType: 5,
      },
      {
        awardId: 464,
        awardName: '谢谢参与',
        awardImgUrl: thanks,
        awardGrade: 8,
        awardType: 5,
      },
    ];
  });

  return awardList;
}

export default useAwardList;
