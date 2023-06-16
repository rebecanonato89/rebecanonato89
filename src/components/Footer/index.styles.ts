import styled from 'styled-components';

export const FooterContainer = styled.footer`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
`;

export const CopyrightText = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  top: -20px; /* Ajuste a posição vertical conforme necessário */
  color: ${({ theme }) => theme.text};
`;

export const SVGImage = styled.svg`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  fill: ${({ theme }) => theme.primary};
  opacity: 0.5;
`;
