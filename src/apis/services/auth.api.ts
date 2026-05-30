import type { User, Role } from '@/types';
import { axiosInstance } from '../core/axiosInstance';

export const authApi = {
  me: async (): Promise<User> => {
    const res = await axiosInstance.get('/api/auth/me');
    return {
      ...res.data,
      role: (res.data.role as string).toLowerCase() as Role,
    };
  },
};
