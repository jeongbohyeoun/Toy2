import styled from 'styled-components';
import logoWhite from '@/assets/images/logo-white.svg';
import { device } from '@/styles/media';

const Footer = () => {
  return (
    <FooterLayout>
      <InnerBox>
        <InfoBox>
          <Logo>
            <LogoImg src={logoWhite} alt="Heath Calendar" />
          </Logo>
          <InfoText>A personalized fitness training management platform.</InfoText>
          <CopyText>&copy; 2024 Team 5 of the Toy Project. All Rights Reserved.</CopyText>
        </InfoBox>
        <ContributorsBox>
          <Title>CONTRIBUTORS</Title>
          <ContributorList>
            <ContributorItem>
              <NameText>박민주</NameText>
              <ContributorLink href="https://github.com/minnug-dev">GitRepository</ContributorLink>
              <ContributorLink href="https://velog.io/@minnug/posts">Blog</ContributorLink>
            </ContributorItem>
            <ContributorItem>
              <NameText>유현욱</NameText>
              <ContributorLink href="https://github.com/YuHyeonWook">GitRepository</ContributorLink>
              <ContributorLink href="https://yho7955.tistory.com/">Blog</ContributorLink>
            </ContributorItem>
            <ContributorItem>
              <NameText>이동희</NameText>
              <ContributorLink href="https://github.com/ldh9669">GitRepository</ContributorLink>
              <ContributorLink href="https://velog.io/@ldh96/posts">Blog</ContributorLink>
            </ContributorItem>
            <ContributorItem>
              <NameText>정보현</NameText>
              <ContributorLink href="https://github.com/jeongbohyeoun">GitRepository</ContributorLink>
              <ContributorLink href="https://velog.io/@wjdfksdl4756/posts">Blog</ContributorLink>
            </ContributorItem>
          </ContributorList>
        </ContributorsBox>
      </InnerBox>
    </FooterLayout>
  );
};

const FooterLayout = styled.footer`
  padding: 4rem 0;
  font-size: 1.4rem;
  color: var(--color-white);
  background-color: var(--color-gray-dark);

  @media ${device.desktop} {
    padding: 3rem 0;
  }
`;

const InnerBox = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 126rem;
  padding: 0 3rem;
  margin: 0 auto;

  @media ${device.desktop} {
    display: block;
  }
`;

const InfoBox = styled.div`
  font-weight: 300;
`;

const Logo = styled.h1`
  margin-bottom: 1.2rem;
`;

const LogoImg = styled.img`
  width: 6rem;
`;

const InfoText = styled.span`
  display: block;
  margin-bottom: 0.4rem;
`;

const CopyText = styled.span`
  display: block;
  margin-bottom: 0.8rem;

  @media ${device.desktop} {
    margin-bottom: 3.2rem;
  }
`;

const ContributorsBox = styled.div``;

const Title = styled.h3`
  margin-bottom: 3.6rem;
  font-size: 2rem;

  @media ${device.desktop} {
    margin-bottom: 2rem;
  }
`;

const ContributorList = styled.ul`
  display: flex;
  column-gap: 8rem;

  @media ${device.tablet} {
    flex-wrap: wrap;
    column-gap: 0;
  }
`;

const ContributorItem = styled.li`
  display: flex;
  flex-direction: column;
  row-gap: 0rem;

  @media ${device.tablet} {
    display: block;
    width: 50%;
    margin-bottom: 4rem;

    &:nth-child(3),
    &:nth-child(4) {
      margin-bottom: 0;
    }
  }
`;

const NameText = styled.span`
  display: block;
  margin-bottom: 1.2rem;
  font-weight: 600;
`;

const ContributorLink = styled.a`
  display: block;
  padding: 0.2rem 0;
  font-weight: 300;

  &:hover {
    text-decoration: underline;
  }
`;

export default Footer;
