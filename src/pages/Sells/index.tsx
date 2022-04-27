import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RiFileEditLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import api from 'services/api';

import * as Yup from 'yup';

import getValidationErrors from 'utils/getValidationErrors';
import { Button, Header, InputSearch } from '../../components';

import { Container, Content } from './styles';

export const Sells = () => {
  const formRef = useRef<FormHandles>(null);

  const [data, setData] = useState();

  useEffect(() => {
    const loadClient = async () => {
      const result = await api.get(`/sells/`);
      setData(result.data);
    };

    loadClient();
  }, []);

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
      <Link to="/sales/new">
        <Button type="button">
          <RiFileEditLine />
          <span>Cadastrar Vendas</span>
        </Button>
      </Link>
      <Header>Vendas</Header>
      <Content>
        <Form ref={formRef} onSubmit={handleLogin}>
          <InputSearch name="search" placeholder="Buscar Vendas" />
        </Form>
        {/* <Table data={data} /> */}
      </Content>
    </Container>
  );
};
