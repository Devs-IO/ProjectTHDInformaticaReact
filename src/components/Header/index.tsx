import { Container } from './styles';

const Header: React.FC<any> = ({ children, ...rest }) => {
  return (
    <Container>
      <span> | </span>
      {children}
    </Container>
  );
};

export default Header;
