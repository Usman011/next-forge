import { IUser } from '@/database/user.model'

import { fetchHandler } from '../handlers/fetch'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const userApi = {
  getAll: () => fetchHandler<IUser[]>(`${API_URL}/users`),
  getById: (id: string) => fetchHandler<IUser>(`${API_URL}/users/${id}`),
  getByEmail: (email: string) =>
    fetchHandler<IUser>(`${API_URL}/users/email`, {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
  create: (userData: Partial<IUser>) =>
    fetchHandler<IUser>(`${API_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  update: (id: string, userData: Partial<IUser>) =>
    fetchHandler<IUser>(`${API_URL}/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
  delete: (id: string) =>
    fetchHandler<IUser>(`${API_URL}/users/${id}`, {
      method: 'DELETE',
    }),
}
