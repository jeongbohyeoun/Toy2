import React, { useState, useEffect } from 'react';
import { ref, set, get } from 'firebase/database';
import { auth, db } from '@/firebase';
import { userInBodyModalProps } from '@/lib/types/userInformation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import {
  LabelBox,
  ModalBackgroundBox,
  UserInformationModalBox,
  UserInformationModalBtnBox,
  UserModalInformationH2,
} from '@/styles/userInformation';
import { toast } from 'react-toastify';

const UserInBodyModal = React.memo(({ isOpen, onClose, setUserBodyData }: userInBodyModalProps) => {
  const [muscleMass, setMuscleMass] = useState<number>(0);
  const [bmi, setBmi] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [fatPercentage, setFatPercentage] = useState<number>(0);

  const loadData = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error('사용자 정보를 찾을 수 없습니다.');
      }

      const userRef = ref(db, `users/${userId}/body`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        setMuscleMass(data.muscleMass ?? 0);
        setBmi(data.bmi ?? 0);
        setHeight(data.height ?? 0);
        setWeight(data.weight ?? 0);
        setFatPercentage(data.fatPercentage ?? 0);
      } else {
        console.error('사용자 정보를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      if (!muscleMass) {
        toast.info('근육량을 입력해주세요.', {
          autoClose: 2000,
        });
        return;
      }
      if (!bmi) {
        toast.info('BMI를 입력해주세요.', {
          autoClose: 2000,
        });
        return;
      }
      if (!height) {
        toast.info('키를 입력해주세요.', {
          autoClose: 2000,
        });
        return;
      }
      if (!weight) {
        toast.info('체중을 입력해주세요.', {
          autoClose: 2000,
        });
        return;
      }
      if (!fatPercentage) {
        toast.info('체지방률을 입력해주세요.', {
          autoClose: 2000,
        });
        return;
      }

      const userId = auth.currentUser?.uid;
      const userRef = ref(db, `users/${userId}/body`);
      await set(userRef, {
        muscleMass,
        bmi,
        height,
        weight,
        fatPercentage,
      });

      setUserBodyData({ muscleMass, bmi, height, weight, fatPercentage });
      toast.success('저장되었습니다.', {
        autoClose: 2000,
      });
      onClose();
    } catch (error) {
      toast.error('저장하는데 실패했습니다.', {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && <ModalBackgroundBox $isOpen={isOpen} onClick={onClose} />}
      <UserInformationModalBox $isOpen={isOpen}>
        <UserModalInformationH2>신체정보 수정</UserModalInformationH2>
        <LabelBox>
          <label htmlFor="height">
            키 (cm):
            <Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} placeholder="cm" />
          </label>
          <label htmlFor="weight">
            체중 (kg):
            <Input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} placeholder="kg" />
          </label>
          <label htmlFor="bmi">
            BMI (kg/㎡):
            <Input type="number" value={bmi} onChange={(e) => setBmi(Number(e.target.value))} placeholder="kg/㎡" />
          </label>
          <label htmlFor="muscleMass">
            근육량 (kg):
            <Input
              type="number"
              value={muscleMass}
              onChange={(e) => setMuscleMass(Number(e.target.value))}
              placeholder="kg"
            />
          </label>
          <label htmlFor="fatPercentage">
            체지방률 (%):
            <Input
              type="number"
              value={fatPercentage}
              onChange={(e) => setFatPercentage(Number(e.target.value))}
              placeholder="%"
            />
          </label>
        </LabelBox>
        <UserInformationModalBtnBox>
          <Button onClick={onClose} mode="white">
            취소
          </Button>
          <Button onClick={handleSave}>저장</Button>
        </UserInformationModalBtnBox>
      </UserInformationModalBox>
    </>
  );
});

export default UserInBodyModal;
