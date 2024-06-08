import { useState, useEffect, useCallback } from 'react';
import { ref, get } from 'firebase/database';
import { auth, db } from '@/firebase';
import UserInBodyModal from '@/components/UserInBobyModal';
import {
  BtnBox,
  UserInformationBox,
  UserInformationContainer,
  UserInformationH2,
  UserInformationSpan,
} from '@/styles/userInformation';
import Button from '@/components/Button';
import { UserInBodyData } from '@/lib/types/userInformation';

const UserInBody = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userBodyData, setUserBodyData] = useState<UserInBodyData>({
    muscleMass: 0,
    bmi: 0,
    height: 0,
    weight: 0,
    fatPercentage: 0,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const loadData = useCallback(async () => {
    const userId = auth.currentUser?.uid;
    const userRef = ref(db, `users/${userId}/body`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      setUserBodyData({
        muscleMass: data.muscleMass || 0,
        bmi: data.bmi || 0,
        height: data.height || 0,
        weight: data.weight || 0,
        fatPercentage: data.fatPercentage || 0,
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
          <UserInformationH2>신체 정보</UserInformationH2>
          <UserInformationBox>
            <p>
              키 (cm)<UserInformationSpan>{userBodyData.height}</UserInformationSpan>
            </p>
            <p>
              체중 (kg)
              <UserInformationSpan>{userBodyData.weight}</UserInformationSpan>
            </p>
            <p>
              BMI (kg/㎡)
              <UserInformationSpan>{userBodyData.bmi}</UserInformationSpan>
            </p>
            <p>
              근육량 (kg)
              <UserInformationSpan>{userBodyData.muscleMass}</UserInformationSpan>
            </p>
            <p>
              체지방률 (%)
              <UserInformationSpan>{userBodyData.fatPercentage}</UserInformationSpan>
            </p>
          </UserInformationBox>
        </main>
        <BtnBox>
          <Button onClick={openModal}>신체정보 등록</Button>
        </BtnBox>
      </UserInformationContainer>
      <UserInBodyModal isOpen={isModalOpen} onClose={closeModal} setUserBodyData={setUserBodyData} />
    </>
  );
};

export default UserInBody;
