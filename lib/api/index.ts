import { accountApi } from './account'
import { authApi } from './auth'
import { userApi } from './user'

export const api = {
  user: userApi,
  account: accountApi,
  auth: { ...authApi },
}
