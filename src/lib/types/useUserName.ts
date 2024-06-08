export interface useUserName {
  userName: string;
  setUserName: (name: string) => void;
  clearLocalStorage: () => void; // 로컬 스토리지 클리어 함수 추가
}
