import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Button from 'components/Button';
import Header from 'components/Header';
import InputSearch from 'components/InputSearch';
import Table from 'components/Table';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RiFileEditLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import getValidationErrors from 'utils/getValidationErrors';
import * as Yup from 'yup';
import api from '../../services/api';
import { Container, Content } from './styles';

interface ProductData {
  id: string;
  code: string;
  name: string;
  categories_name: string;
  providers_name: string;
  sell_price: number;
  quantity: number;
  active: boolean;
}

export const Product = () => {
  const formRef = useRef<FormHandles>(null);

  const [data, setData] = useState<ProductData[]>([]);

  const head = {
    id: 'id',
    code: 'Código',
    name: 'Nome',
    categories_name: 'Categoria',
    providers_name: 'Fornecedor',
    sell_price: 'Preço',
    quantity: 'Quantidade',
    active: 'Ativo',
  };

  useEffect(() => {
    const loadClient = async () => {
      const result = await api.get(`/products/`);

      console.log(result.data);

      // result.data.foreach((item: ProductData) => {
      //   setData(
      //     data.concat({
      //       id: item.id,
      //       code: item.code,
      //       name: item.name,
      //       categories_name: item.categories_name,
      //       providers_name: item.providers_name,
      //       sell_price: item.sell_price,
      //       quantity: item.quantity,
      //       active: item.active,
      //     })
      //   );
      // });
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
        {data.length > 0 && <Table data={data} head={head} />}
      </Content>
    </Container>
  );
};
