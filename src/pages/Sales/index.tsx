import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiFileEditLine } from 'react-icons/ri';

import getValidationErrors from 'utils/getValidationErrors';
import Button from 'components/Button';
import Header from 'components/Header';

import { Container, Content } from './styles';
import InputSearch from 'components/InputSearch';

export const Sales = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const handleLogin = useCallback(async (data: any) => {
    try {
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
    }
  }, []);

  return (
    <Container>
      <Button type="button">
        <RiFileEditLine />
        <span>Cadastrar Vendas</span>
      </Button>
      <Header>Vendas</Header>
      <Content>
        <Form ref={formRef} onSubmit={handleLogin}>
          <InputSearch name="search" placeholder="Buscar Vendas" />
        </Form>
      </Content>
    </Container>
  );
};
