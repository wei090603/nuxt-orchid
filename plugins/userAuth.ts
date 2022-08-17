import { getStorage } from "~~/utils/storage";
import useUserStore from "~~/store/user";

export default (context) => {
  if(process.client){
    const token = getStorage('token');
    const userStore = useUserStore();
    console.log(1111)
    context.app.router.beforeEach( async (to, from, next) => {
      if(token){
        await userStore.getUserInfo()
      }
      next();
    })
  }
};