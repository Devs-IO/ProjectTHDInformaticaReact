import { Routes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle, { Container } from './styles/globals';
import Menu from 'components/Menu';

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
