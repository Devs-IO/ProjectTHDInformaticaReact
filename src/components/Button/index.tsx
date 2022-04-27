import { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, color, ...rest }) => {
  return (
    <Container type="button" {...rest} style={{ backgroundColor: color }}>
      {children}
    </Container>
  );
};
