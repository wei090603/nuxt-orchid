export const useUser = () => useState('user', () => ({
  token: '1234455token',
  userInfo: {
    id: 1,
    account: 'test'
  }
}))
