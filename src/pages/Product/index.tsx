import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { RiFileEditLine } from 'react-icons/ri';
import api from '../../services/api';

import getValidationErrors from 'utils/getValidationErrors';
import Button from 'components/Button';
import Header from 'components/Header';

import { Container, Content } from './styles';
import InputSearch from 'components/InputSearch';
import Table from 'components/Table';


export const Product = () => {
  const formRef = useRef<FormHandles>(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await api.get('/products')
      setData(result.data)
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
        Header: 'Produtos',
        columns: [
          {
            Header: 'Nome',
            accessor: 'name',
          },
        ],
      },
    ],
    []
  );

  return (
    <Container>
      <Link to={'/products/new'}>
        <Button type="button">
          <RiFileEditLine />
          <span>Cadastrar Produtos</span>
        </Button>
      </Link>
      <Header>Produtos</Header>
      <Content>
        <Form ref={formRef} onSubmit={handleLogin}>
          <InputSearch name="search" placeholder="Buscar Produtos" />
        </Form>
        <Table columns={columns} data={data} />
      </Content>
    </Container>
  );
};
