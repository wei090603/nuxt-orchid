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
  namespace Login {
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
  }
}
