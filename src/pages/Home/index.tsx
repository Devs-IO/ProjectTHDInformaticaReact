import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Button from 'components/Button';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import Input from 'components/Input';
import { useCallback, useRef } from 'react';
import Line from '../../assets/Home/Line.svg';
import { Container, Content } from '../../styles/home';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData {
  email: string;
  password: string;
}

export const Home = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (data: SignInFormData) => {
      try {
        navigate('/sales');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
      }
    },
    [navigate]
  );

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleLogin}>
          <Link to="/home">Login</Link>
          <Link to="/register">Cadastrar</Link>
          <img src={Line} alt="" />
          <Input name="email" placeholder="E-mail" />
          <Input name="password" placeholder="Senha" type="password" />
          <Button type="submit">Entrar</Button>
        </Form>
      </Content>
    </Container>
  );
};
