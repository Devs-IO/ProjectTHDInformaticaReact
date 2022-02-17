import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Button from 'components/Button';
import Header from 'components/Header';
import InputSearch from 'components/InputSearch';
import Table from 'components/Table';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RiFileEditLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import api from 'services/api';
import getValidationErrors from 'utils/getValidationErrors';
import * as Yup from 'yup';
import { Container, Content } from './styles';

export const Client = () => {
  const formRef = useRef<FormHandles>(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await api.get('/clients');
      setData(result.data);
    })();
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

  const columns = useMemo(
    () => [
      {
        Header: 'Clientes',
        columns: [
          {
            Header: 'Nome',
            accessor: 'name',
          },
          {
            Header: 'Telefone',
            accessor: 'phone',
          },
          {
            Header: 'E-mail',
            accessor: 'email',
          },
          {
            Header: 'CPF',
            accessor: 'cpf',
          },
          {
            Header: 'Cidade',
            accessor: 'city',
          },
        ],
      },
    ],
    []
  );

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

        <Table columns={columns} data={data} />
      </Content>
    </Container>
  );
};
