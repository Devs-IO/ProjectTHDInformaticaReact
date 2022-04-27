import { BrowserRouter as Router } from 'react-router-dom';
import { Menu } from './components';
import { Routes } from './routes';
import GlobalStyle, { Container } from './styles/globals';

export const App = () => {
  return (
    <Router>
      <Container>
        <Menu />
        <Routes />
      </Container>
      <GlobalStyle />
    </Router>
  );
};
