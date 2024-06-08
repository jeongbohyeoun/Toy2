import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import UserInfoModal from '@/components/UserInfoModal';
import { ref, get } from 'firebase/database';
import { auth, db } from '@/firebase';
import Button from '@/components/Button';
import { UserInfoData } from '@/lib/types/userInformation';
import {
  BtnBox,
  UserInformationBox,
  UserInformationContainer,
  UserInformationH2,
  UserInformationSpan,
} from '@/styles/userInformation';

const UserInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userInfoData, setUserInfoData] = useState<UserInfoData>({
    photoURL: '',
    birthday: '',
    phoneNumber: '',
    email: '',
    userName: '',
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const loadData = useCallback(async () => {
    const userId = auth.currentUser?.uid;
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      setUserInfoData({
        photoURL: data.photoURL || '',
        birthday: data.birthday || '',
        phoneNumber: data.phoneNumber || '',
        email: data.email || '',
        userName: data.userName || '',
      });
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <UserInformationContainer>
        <main>
          <UserInformationH2>개인정보</UserInformationH2>
          <ProfileBox>
            {userInfoData.photoURL && <ProfileImage src={userInfoData.photoURL} alt="프로필 이미지" />}
          </ProfileBox>
          <UserInformationBox>
            <p>
              닉네임
              <UserInformationSpan>{userInfoData.userName}</UserInformationSpan>
            </p>
            <p>
              이메일
              <UserInformationSpan>{userInfoData.email}</UserInformationSpan>
            </p>
            <p>
              생년월일
              <UserInformationSpan>{userInfoData.birthday}</UserInformationSpan>
            </p>
            <p>
              핸드폰 번호
              <UserInformationSpan>{userInfoData.phoneNumber}</UserInformationSpan>
            </p>
          </UserInformationBox>
        </main>
        <BtnBox>
          <Button onClick={openModal}>개인정보 등록</Button>
        </BtnBox>
      </UserInformationContainer>
      <UserInfoModal isOpen={isModalOpen} onClose={closeModal} setUserInfoData={setUserInfoData} />
    </>
  );
};

export default UserInfo;

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 20%;
  margin: -2rem auto 4rem;
`;
