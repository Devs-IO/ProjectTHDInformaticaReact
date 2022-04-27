import { Container } from './styles';

export const Header: React.FC<any> = ({ children, ...rest }) => {
  return (
    <Container>
      <span> | </span>
      {children}
    </Container>
  );
};
