import UserInBody from '@/components/UserInBoby';
import UserInfo from '@/components/UserInfo';
import { device } from '@/styles/media';
import styled from 'styled-components';

const MyPage = () => {
  return (
    <UserInfomationBox>
      <UserInfo />
      <UserInBody />
    </UserInfomationBox>
  );
};

export default MyPage;

const UserInfomationBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5rem;

  @media ${device.tablet} {
    display: block;
  }
`;
