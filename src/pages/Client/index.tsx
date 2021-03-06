import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Button, Header, InputSearch, Table } from '../../components';

import { useCallback, useEffect, useRef, useState } from 'react';
import { RiFileEditLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import api from 'services/api';
import getValidationErrors from 'utils/getValidationErrors';
import * as Yup from 'yup';
import { Container, Content } from './styles';

export const Client = () => {
  const formRef = useRef<FormHandles>(null);

  const [data, setData] = useState([]);

  const head = {
    id: 'id',
    name: 'Nome',
    phone: 'Telefone',
    email: 'Email',
    cpf: 'CPF',
    city: 'Cidade',
    active: 'Ativo',
  };

  useEffect(() => {
    const loadClient = async () => {
      const result = await api.get(`/clients/`);
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
      <Link to="/clients/new">
        <Button type="button">
          <RiFileEditLine />
          <span>Cadastrar Clientes</span>
        </Button>
      </Link>
      <Header>Clientes</Header>
      <Content>
        <Form ref={formRef} onSubmit={handleLogin}>
          <InputSearch name="search" placeholder="Buscar Clientes" />
        </Form>
        {data.length > 0 && <Table data={data} head={head} link="clients" />}
        {data.length === 0 && <p> Não há clientes a serem exibidos!</p>}
      </Content>
    </Container>
  );
};
