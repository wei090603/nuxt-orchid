declare namespace API {
  type Response<T> = {
    status: number;
    data: T;
    msg: string;
  };
  type RequestPage = {
    limit: number;
    page: number;
  };
  type ResponsePage<T> = {
    total: number;
    pages: number; // 总页数
    list: T[];
  };
  type File = {
    path: string;
  };
  namespace ILogin {
    type BannerItem = {
      id: number;
      title: string;
      picUrl: string;
      position: number;
      remark: string;
      upDownStatus: number;
      createTime: string;
      delStatus: number;
    };
    type LoginRes = {
      token: string;
    };
  }
  namespace IUserInfo {
    type UserInfo = {
      id: number;
      createdAt: string;
      updatedAt: string;
      account: string;
      nickName: string;
      phoneNum: string;
      email: string;
      favs: number;
      signInCount: number;
      age: number;
      sex: boolean;
      dateBirth: string;
      position: boolean;
      location: null | string;
      signText: string;
      vip: boolean;
      avatar: string;
      openId: null | number;
      status: boolean;
      userTag: string[];
      isSign: boolean;
    };
  }
}
