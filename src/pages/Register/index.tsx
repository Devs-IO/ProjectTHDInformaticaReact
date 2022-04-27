import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import Line from '../../assets/Home/Line_invers.svg';
import { Button, Input } from '../../components/';
import { Container, Content } from '../../styles/home';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData {
  email: string;
  password: string;
}

export const Register = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const handleRegister = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().email('Digite um e-mail válido').required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        navigate('/product');
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
        <Form ref={formRef} onSubmit={handleRegister}>
          <Link to="/home">Login</Link>
          <Link to="/register">Cadastrar</Link>
          <img src={Line} alt="" />
          <Input name="email" placeholder="E-mail" />
          <Input name="password" placeholder="Senha" type="password" />
          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  );
};
