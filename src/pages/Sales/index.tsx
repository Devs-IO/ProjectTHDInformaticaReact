import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RiFileEditLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import api from 'services/api';

import * as Yup from 'yup';

import Button from 'components/Button';
import Header from 'components/Header';
import getValidationErrors from 'utils/getValidationErrors';

import InputSearch from 'components/InputSearch';
import Table from 'components/Table';
import { Container, Content } from './styles';

export const Sales = () => {
  const formRef = useRef<FormHandles>(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await api.get('/sells');
      setData(result.data);
    })();
  }, [data]);

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

  if (data.length === 0) {
    return (
      <Container>
        <Header>Carregando os produtos</Header>
        <hr />
      </Container>
    );
  }

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
        {data.length > 0 && <Table data={data}/>}
      </Content>
    </Container>
  );
};
