import React from 'react';
import { FaGithub, FaLinkedin, FaStackOverflow, FaFileAlt, FaWhatsappSquare } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
import { Container } from './styles';

function Social() {
  return (
    <Container>
      <a id="github" title="GitHub" href="https://github.com/rebecanonato89">
        <FaGithub />
      </a>
      <a id="stack" title="stackoverflow" href="https://pt.stackoverflow.com/users/81283/rebeca-nonato">
          <FaStackOverflow />
      </a>
      <a
        id="linkedin"
        title="Linkedin"
        href="https://www.linkedin.com/in/rebecanonato89/"
      >
        <FaLinkedin />
      </a>
      <a id="curriculo" title="Currículo" href="https://drive.google.com/file/d/1wd6WQ7rd3roxVBEpAlNxUhOPHyr3pTL5/view?usp=sharing">
          <FaFileAlt />
      </a>
      <a id="email" title="Email" href="mailto:rebecanonato89@gmail.com">
        <GrMail />
      </a>
    </Container>
  );
}

export default Social;
