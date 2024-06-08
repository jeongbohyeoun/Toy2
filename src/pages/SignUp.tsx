import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/firebase';
import { useNavigate } from 'react-router-dom';
import bgLogin from '@/assets/images/bg-login.png';
import logo from '@/assets/images/logo.svg';
import iconArrow from '@/assets/images/icon-arrow.svg';
import { BgLoginImg, LogoImg, SignForm, SignSection, SignLabel, BorderBox } from '@/styles/AuthStyles';
import Button from '@/components/Button';
import { ref, set } from 'firebase/database';
import Input from '@/components/Input';
import { device } from '@/styles/media';
import { FirebaseError } from 'firebase/app';
import { ErrorMesBox } from '@/styles/errorMsg';
import styled from 'styled-components';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('유효한 이메일 주소를 입력하세요.');
      return;
    }

    if (password.length < 8 || !/\d/.test(password)) {
      setPasswordError('비밀번호는 최소 8자 이상이어야 하며, 숫자를 포함해야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setError('이미 사용 중인 이메일입니다.');
            break;
          default:
            setError(error.message);
        }
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        set(userRef, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <BgLoginImg src={bgLogin} alt="회원가입 화면 이미지" />
      <SignForm onSubmit={handleSignUp}>
        <SignSection>
          <BackIconBox onClick={handleGoBack}>
            <BackIcon src={iconArrow} alt="화살표 이미지" />
            뒤로가기
          </BackIconBox>
          <LogoImg src={logo} alt="로고 이미지" />
          <h2>회원가입</h2>
          <SignLabel htmlFor="email">
            이메일(아이디)
            <Input
              type="email"
              placeholder="이메일(아이디)을 입력하세요"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError('');
              }}
              required
            />
          </SignLabel>
          <SignLabel htmlFor="password">
            비밀번호
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setPasswordError('');
              }}
              required
            />
          </SignLabel>
          <SignLabel htmlFor="password">
            비밀번호 확인
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setPasswordError('');
              }}
              required
            />
          </SignLabel>
          <ErrorMesBox>
            {error && <p>{error}</p>}
            {passwordError && <p>{passwordError}</p>}
          </ErrorMesBox>
          <BorderBox />
          <ButtonLayout type="submit">회원가입</ButtonLayout>
        </SignSection>
      </SignForm>
    </>
  );
};

export default SignUp;

const BackIconBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: -2rem;
  margin-right: auto;
  color: var(--color-primary);
  cursor: pointer;
`;

const BackIcon = styled.img`
  margin-right: auto;
  padding-right: 1rem;
  width: 3rem;
`;

const ButtonLayout = styled(Button)`
  width: 70%;

  @media ${device.mobile} {
    width: 90%;
  }
`;
