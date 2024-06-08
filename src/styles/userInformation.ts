import styled from 'styled-components';
import { device } from './media';

export const UserInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: 0;
  flex-grow: 1;
  padding: 5rem;
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: 0 2px 15px 5px rgba(0, 0, 0, 0.03);

  @media ${device.tablet} {
    margin-bottom: 3rem;
    padding: 3rem;
  }
`;

export const UserInformationH2 = styled.h2`
  margin-bottom: 5rem;
`;

export const UserInformationBox = styled.div`
  p {
    margin-bottom: 3.6rem;
    font-weight: 500;

    &:last-child {
      margin-bottom: 5rem;
    }
  }
`;

export const UserInformationSpan = styled.span`
  margin-top: 1rem;
  border: 1px solid var(--color-gray-light);
  border-radius: 0.5rem;
  background-color: var(--color-white);
  padding: 0.5rem;
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;

  @media ${device.tablet} {
    height: 4.2rem;
  }
`;

export const BtnBox = styled.div`
  button {
    width: 100%;
    margin: 0 auto;
  }
`;

/*
 * 모달 스타일
 */

// 레이블을 위한 컨테이너 스타일
export const LabelBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  label {
    margin-bottom: 0.8rem;
  }
`;

export interface UserModalBtnBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

// 사용자 정보 모달의 메인 컨테이너 스타일
export const UserInformationModalBox = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-white);
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 90%;
  max-width: 55rem;
`;

// 모달의 배경 스타일
export const ModalBackgroundBox = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const UserInformationModalBtnBox = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 2rem;
  margin-top: 3rem;
`;

export const UserModalInformationH2 = styled.h2`
  margin-bottom: 3rem;
`;
