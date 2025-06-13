import React from 'react';
import Header from '../controllers/Header';
import Footer from '../controllers/Footer';
import TopPage from '../controllers/TopPage';
import Gretting from '../controllers/Greeting';
import Skills from '../controllers/Skills';
import Projects from '../controllers/Projects';
import Contact from '../controllers/Contact';

function Main() {
  return (
    <>
      <div className="maintenance">
        <h1>Site em Manutenção</h1>
        <p>Estamos realizando algumas melhorias. Voltaremos em breve!</p>
      </div>
    </>
  );
}

export default Main;
