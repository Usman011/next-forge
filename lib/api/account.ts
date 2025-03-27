import { IAccount } from '@/database/account.model'

import { fetchHandler } from '../handlers/fetch'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const accountApi = {
  accounts: {
    getAll: () => fetchHandler<IAccount[]>(`${API_URL}/accounts`),
    getById: (id: string) =>
      fetchHandler<IAccount>(`${API_URL}/accounts/${id}`),
    getByProvider: (providerAccountId: string) =>
      fetchHandler<IAccount>(`${API_URL}/accounts/provider`, {
        method: 'POST',
        body: JSON.stringify({ providerAccountId }),
      }),
    create: (accountData: Partial<IAccount>) =>
      fetchHandler<IAccount>(`${API_URL}/accounts`, {
        method: 'POST',
        body: JSON.stringify(accountData),
      }),
    update: (id: string, accountData: Partial<IAccount>) =>
      fetchHandler<IAccount>(`${API_URL}/accounts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(accountData),
      }),
    delete: (id: string) =>
      fetchHandler<IAccount>(`${API_URL}/accounts/${id}`, {
        method: 'DELETE',
      }),
  },
}
