import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useUserName } from '../types/useUserName';

export const useUserNameStore = create<useUserName>()(
  persist(
    (set) => ({
      userName: '',
      setUserName: (name: string) => set({ userName: name }),
      clearLocalStorage: () => set({ userName: '' }), // 로컬 스토리지 클리어 함수 추가
    }),
    {
      name: 'user-NickName',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
