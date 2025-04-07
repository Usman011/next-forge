import ROUTES from '@/constants/routes'
import { IAccount } from '@/database/account.model'
import { SigninWithOAuthProps } from '@/types/form'

import { fetchHandler } from '../handlers/fetch'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const authApi = {
  signinWithOAuth: ({
    user,
    provider,
    providerAccountId,
  }: SigninWithOAuthProps) =>
    fetchHandler<IAccount>(`${API_URL}/auth/${ROUTES.SIGN_IN_WITH_OAUTH}`, {
      method: 'POST',
      body: JSON.stringify({ user, provider, providerAccountId }),
    }),
}
