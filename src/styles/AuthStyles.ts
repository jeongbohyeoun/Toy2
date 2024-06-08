import styled from 'styled-components';
import bgLogin from '@/assets/images/bg-login.png';
import bgLoginMobile from '@/assets/images/bg-login-mobile.png';
import { device } from './media';

export const SignForm = styled.form`
  position: relative;
  display: flex;
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;

  @media ${device.desktop} {
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const SignSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  border: 1px solid var(--color-white);
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  min-width: 50rem;
  height: 70rem;
  background-color: var(--color-white);

  h2 {
    margin-bottom: 2rem;
  }

  @media ${device.mobile} {
    width: 85%;
    min-width: 32rem;
  }
`;

export const BgLoginImg = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  background: url(${bgLogin}) no-repeat center / cover;

  @media ${device.desktop} {
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-image: url(${bgLoginMobile});
  }
`;

export const LogoImg = styled.img`
  width: 12rem;
`;

export const SignLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 70%;

  @media ${device.mobile} {
    width: 90%;
  }
`;

export const BorderBox = styled.div`
  background: #ededf4;
  border: none;
  height: 1px;
  width: 70%;

  @media ${device.mobile} {
    width: 90%;
  }
`;
