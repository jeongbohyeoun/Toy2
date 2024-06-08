import styled from 'styled-components';
import logo from '@/assets/images/logo.svg';

const Loading = () => {
  return (
    <LoadingBox>
      <LoadingImg src={logo}></LoadingImg>
      <LoadingAnimationBox>
        <LoadingAnimation></LoadingAnimation>
        <LoadingAnimation></LoadingAnimation>
        <LoadingAnimation></LoadingAnimation>
        <LoadingAnimation></LoadingAnimation>
        <LoadingAnimation></LoadingAnimation>
      </LoadingAnimationBox>
    </LoadingBox>
  );
};

const LoadingBox = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-white);
  transition: 0.3s;
`;

const LoadingAnimationBox = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 2.3rem;
`;

const LoadingImg = styled.img`
  width: 15rem;
  margin-bottom: 4rem;
`;

const LoadingAnimation = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: var(--color-primary);
  animation: loading 1s 0s linear infinite;

  &:nth-child(1) {
    animation-delay: 0s;
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  &:nth-child(4) {
    animation-delay: 0.6s;
  }

  &:nth-child(5) {
    animation-delay: 0.8s;
  }

  @keyframes loading {
    0%,
    100% {
      opacity: 0;
      transform: scale(0.5);
    }

    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }
`;

export default Loading;
