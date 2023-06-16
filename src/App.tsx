import { useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Footer from './components/Footer';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import colorsDark from './styles/colors-dark';
import colorsLight from './styles/colors-light';
import { GlobalStyle, ThemeToggle } from './styles/styles';

const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? colorsLight : colorsDark}>
      <Router>
        <GlobalStyle />
        <Header />
        <Switch>
          <Route path="/" element={<LandingPage />} />
        </Switch>
        <Footer />
        <ThemeToggle onClick={toggleTheme}>
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </ThemeToggle>
      </Router>
    </ThemeProvider>
  );
};

export default App;
