export const useIsShowModal = () => useState('isShowModal', () => false);

// 更新用户信息
export const useShowModal = async () => {
  const isShowModal = useIsShowModal();

  console.log(11111);
  // 用户已登录，直接获取用户信息
  isShowModal.value = !isShowModal.value;
};
