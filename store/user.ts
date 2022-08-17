import { defineStore } from "pinia";
import { userInfo } from "~~/composables/home";

type IUser = {
  id: number;
  account: string;
  sex: string
}

export default defineStore('user', {
  state() {
    return {
      name: 'user',
      userInfo: {} as IUser,
      token: ''
    }
  },
  actions: {
    async getUserInfo() {
      console.log(133333)
      try {
        const data = await userInfo();
        console.log(data.value, 'userInfo')
        this.userInfo = data.value
      } catch (error) {
        throw new Error(error as string);
      }
    },
  },
})