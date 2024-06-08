import styled from 'styled-components';
import iconError from '@/assets/images/icon-error-triangle.svg';

const NotFound = () => {
  return (
    <NotFoundBox>
      <ErrorImg src={iconError} alt="health calendar" />
      <span>404</span>
      <p>페이지를 찾을 수 없습니다.</p>
      <p>입력하신 페이지 주소가 정확한지 또는 존재하는지 확인바랍니다.</p>
    </NotFoundBox>
  );
};

export default NotFound;

const NotFoundBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 0 3rem;
  height: 100vh;
  color: var(--color-primary);

  span {
    display: block;
    font-size: 10rem;
    font-weight: 700;
    padding: 3rem 0;
  }

  p {
    font-size: 2rem;
    padding: 0.5rem;
    font-weight: 500;
    color: var(--color-gray-dark);
  }
`;

const ErrorImg = styled.img`
  width: 14rem;
`;
