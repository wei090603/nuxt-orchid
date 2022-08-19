export const useUserInfo = () => useState('userInfo', () => ({
    id: 1,
    account: 'test'
}))


export const useTOken = () => useState('token', () => 'token')

export const useIsLogin = () => useState('isLogin', () => false)