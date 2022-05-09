import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RiFileEditLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import api from 'services/api';

import * as Yup from 'yup';

import getValidationErrors from 'utils/getValidationErrors';
import { Button, Header, InputSearch, Table } from '../../components';

import { Container, Content } from './styles';

interface SellsData {
  id: string;
  clients_name: string;
  status_name: string;
  payment_options_name: string;
  code: string;
  discount: number;
  total_value: string;
  products: string;
  installments: string;
}

export const Sells = () => {
  const formRef = useRef<FormHandles>(null);

  const [data, setData] = useState<SellsData[]>([]);

  const head = {
    id: 'id',
    code: 'Código',
    clients_name: 'Cliente',
    status_name: 'Status',
    payment_options_name: 'Forma de Pagamento',
    discount: 'Desconto',
    total_value: 'Valor Total',
    products: 'Produtos',
    installments: 'Parcelas',
  };

  useEffect(() => {
    const loadSells = async () => {
      const result = await api.get(`/sells/`);

      const sells = result.data.map((item: any) => {
        let installments =
          item.installments.length > 0
            ? `${item.installments[0].total_installments}x - R$${item.installments[0].value_installments}`
            : 'À vista';
        let products = '';

        products = item.productsData.map((product: any) => {
          return products.concat(`${product.products_name} - R$${product.products_price} | `);
        });

        return {
          id: item.id,
          code: item.code,
          clients_name: item.clients_name,
          status_name: item.status_name,
          payment_options_name: item.payment_options_name,
          discount: item.discount,
          total_value: 'R$' + item.total_value,
          products: products,
          installments: installments,
        };
      });

      setData(sells);
    };

    loadSells();
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

  if (data.length === 0) {
    return (
      <Container>
        <Header>Carregando os Vendas</Header>
        <hr />
      </Container>
    );
  }

  return (
    <Container>
      <Link to="/sells/new">
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
        {data.length > 0 && <Table data={data} head={head} link="sells" />}
      </Content>
    </Container>
  );
};
