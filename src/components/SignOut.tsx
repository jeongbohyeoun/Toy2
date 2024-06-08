import { useUserNameStore } from '@/lib/store/useUserNameStore';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SignOut = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const clearLocalStorage = useUserNameStore((state) => state.clearLocalStorage); // Zustand 스토어에서 clearLocalStorage 액션 가져오기

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      clearLocalStorage();
      navigate('/');
    } catch (error) {
      console.log('로그아웃 실패:', error);
    }
  };

  return <LogoutBtn onClick={handleLogOut}>로그아웃</LogoutBtn>;
};

export default SignOut;

const LogoutBtn = styled.button`
  font-size: 1.8rem;
  color: var(--color-primary);
  font-weight: 600;
  transition: color 0.2s;
  &:hover {
    color: var(--color-primary-dark);
  }
`;
