import styled, { DefaultTheme, createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
   /* Remove list styles (bullet points) */
  ul,
  ol {
    list-style: none;
  }
    /* Remove default button styles */
  button {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
    /* Remove default hyperlink styles */
  a {
    text-decoration: none;
    color: inherit;
  }

`;

type ThemeToggleProps = {
  theme: DefaultTheme;
};

export const ThemeToggle = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 999;
`;
