import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Button from 'components/Button';
import Header from 'components/Header';
import InputSearch from 'components/InputSearch';
import Table from 'components/Table';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RiFileEditLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import getValidationErrors from 'utils/getValidationErrors';
import * as Yup from 'yup';
import api from '../../services/api';
import { Container, Content } from './styles';

export const Product = () => {
  const formRef = useRef<FormHandles>(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await api.get('/products');
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
        Header: 'Produtos',
        columns: [
          {
            Header: 'Nome',
            accessor: 'name',
          },
          {
            Header: 'Categoria',
            accessor: 'categories_name',
          },
          {
            Header: 'Fornecedor',
            accessor: 'providers_name',
          },
          {
            Header: 'Preço de Venda',
            accessor: 'sell_price',
          },
          {
            Header: 'Preço de Compra',
            accessor: 'buy_price',
          },
          {
            Header: 'Quantidade',
            accessor: 'quantity',
          },
          {
            Header: 'Codigo',
            accessor: 'code',
          },
          {
            Header: 'Ações',
            accessor: '<BsTrash />',
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
