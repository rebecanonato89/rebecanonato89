import { CopyrightText, FooterContainer, SVGImage } from './index.styles';

const Footer = () => {
  return (
    <FooterContainer>
      <SVGImage xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path d="M0,32L40,32C80,32,160,32,240,74.7C320,117,400,203,480,202.7C560,203,640,117,720,112C800,107,880,181,960,192C1040,203,1120,149,1200,117.3C1280,85,1360,75,1400,69.3L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
      </SVGImage>
      <CopyrightText>
        <span>
          &copy; {new Date().getFullYear()} rebecanonato89. Todos os direitos
          reservados.
        </span>
      </CopyrightText>
    </FooterContainer>
  );
};

export default Footer;
