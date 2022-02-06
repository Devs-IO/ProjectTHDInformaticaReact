import React from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useCallback, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RiFileEditLine } from 'react-icons/ri';

import getValidationErrors from 'utils/getValidationErrors';
import Button from 'components/Button';
import Header from 'components/Header';
import InputSearch from 'components/InputSearch';
import Table from 'components/Table';

import { Container, Content } from './styles';

export const Client = () => {
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

  const columns = React.useMemo(
    () => [
      {
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

  const data = React.useMemo(() => [], []);

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
