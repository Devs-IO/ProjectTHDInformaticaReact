import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Button from 'components/Button';
import Header from 'components/Header';
import Input from 'components/Input';
import Select from 'components/Select';
import TextArea from 'components/TextArea';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import api from 'services/api';
import getValidationErrors from 'utils/getValidationErrors';
import * as Yup from 'yup';
import { Container, Content, RegisterDiv } from './styles';

interface ProductsData {
  name: string;
  sell_price: string;
  buy_price: string;
  description: string;
  quantity: string;
  code: string;
  provider_id: string;
  category_id: string;
}

export const ProductRegister = () => {
  const formRef = useRef<FormHandles>(null);

  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const providerResult = await api.get('/providers');
      const providerData = providerResult.data.map((p: any) => ({
        value: p.id,
        label: p.contact_name,
      }));
      setProviders(providerData);
    })();
    (async () => {
      const categoriesResult = await api.get('/categories');
      const categoriesData = categoriesResult.data.map((c: any) => ({
        value: c.id,
        label: c.name,
      }));
      setCategories(categoriesData);
    })();
  }, []);

  const handleRegister = useCallback(async (data: ProductsData) => {
    try {
      console.log(data);
      await api.post('/products', data);
      alert('Foi?');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      alert('Erro no cadastro');
    }
  }, []);

  return (
    <Container>
      <Header>Novo Cliente</Header>
      <Content>
        <Form ref={formRef} onSubmit={handleRegister}>
          <div>
            <label>Nome do Produto</label>
            <Input name="name" placeholder="Nome do Produto" required />
          </div>
          <div>
            <label>Tipo</label>
            <Select name="category_id" placeholder="Categorias" options={categories} />
          </div>
          <div style={{ display: 'flex' }}>
            <RegisterDiv>
              <label>Preço de Venda</label>
              <Input name="sell_price" placeholder="R$" />
            </RegisterDiv>
            <div style={{ width: '14.5vw' }}>
              <label>Preço de Compra</label>
              <Input name="buy_price" placeholder="" />
            </div>
          </div>
          <div>
            <label>Fornecedor</label>
            <Select name="provider_id" placeholder="Fornecedor" options={providers} />
          </div>
          <div>
            <label>Descrição</label>
            <TextArea name="description" placeholder="Descrição" />
          </div>
          <div style={{ display: 'flex' }}>
            <RegisterDiv>
              <label>Qtd. por item</label>
              <Input name="quantity" placeholder="" />
            </RegisterDiv>
            <div style={{ width: '14.5vw' }}>
              <label>Código</label>
              <Input name="code" placeholder="" />
            </div>
          </div>

          <Button type="submit">
            <BsFillCheckCircleFill />
            <span>Cadastrar</span>
          </Button>
          <Button type="submit" color="#9C1524" className="button_cancel">
            <BsFillXCircleFill />
            <span>Cancelar</span>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};
