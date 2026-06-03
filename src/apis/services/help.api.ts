import type { RegistTravlerHelpRequest } from '@/types/help';
import { axiosInstance } from '../core/axiosInstance';

export const helpApi = {
  gethelper: async () => {},

  saveTravlerInfo: async (payload: RegistTravlerHelpRequest) => {
    return axiosInstance.post('/api/help/regist', payload);
  },
};
