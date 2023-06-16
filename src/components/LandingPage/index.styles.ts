import styled from 'styled-components';

export const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

export const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.text};
`;

export const Description = styled.p`
  font-size: 18px;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;
