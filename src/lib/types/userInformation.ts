export interface UpdatedInfo {
  displayName?: string;
  email?: string;
  birthday?: string;
  phoneNumber: string;
}

export interface ModalProps {
  isOpen: boolean;
}

export interface UserInfoModalType {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedInfo: UpdatedInfo) => void;
  user: UpdatedInfo | null;
}

export interface UserInfoData {
  photoURL: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  userName: string;
}

export interface UserInBodyData {
  muscleMass: number;
  bmi: number;
  height: number;
  weight: number;
  fatPercentage: number;
}

interface userModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface userInBodyModalProps extends userModalProps {
  setUserBodyData: React.Dispatch<
    React.SetStateAction<{
      muscleMass: number;
      bmi: number;
      height: number;
      weight: number;
      fatPercentage: number;
    }>
  >;
}

export interface userInfoModalProps extends userModalProps {
  setUserInfoData: React.Dispatch<
    React.SetStateAction<{
      photoURL: string;
      birthday: string;
      // birthday: string;
      phoneNumber: string;
      email: string;
      userName: string;
    }>
  >;
}
