import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import axios from 'axios';
import api from 'services/api';

import Button from 'components/Button';
import Header from 'components/Header';
import Input from 'components/Input';
import Select from 'components/Select';

import { useCallback, useRef, useEffect, useState } from 'react';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import getValidationErrors from 'utils/getValidationErrors';

import { Container, Content, RegisterDiv, Textarea } from './styles';


interface ProductsData {
  name: string;
  sell_price: string;
  buy_price: string;
  description: string;
  quantity: string;
  code: string;
};

export const ProductRegister = () => {
  const formRef = useRef<FormHandles>(null);
  const [name] = useState("");
  const [sell_price] = useState("");
  const [buy_price] = useState("")
  const [description] = useState("");
  const [quantity] = useState("");
  const [code] = useState("");
  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const providerResult = await api.get('/providers');
      const providerData = providerResult.data.map((p:any) => ({
        value: p.id,
        label: p.contact_name,
      }));
      setProviders(providerData);
    })();
    (async () => {
      const categoriesResult = await api.get('/categories');
      const categoriesData = categoriesResult.data.map((c:any) => ({
        value: c.id,
        label: c.name,
      }))
      setCategories(categoriesData)
    })();
  }, []);

  const handleRegister = useCallback(async (data: ProductsData) => {
    try {
      console.log(data);
      await api.post('/products', data);
      alert("Foi?");
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      alert("Erro no cadastro");
    }
  }, []);

  return (
    <Container>
      <Header>Novo Cliente</Header>
      <Content>
        <Form ref={formRef} onSubmit={handleRegister}>
          <div>
            <label>Nome do Produto</label>
            <Input 
              name="name"
              placeholder="Nome do Produto" 
              value={name}
              required />
          </div>
          <div>
            <label>Tipo</label>
            <Select 
              name='types' 
              placeholder='Categorias'
              options={categories}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <RegisterDiv>
              <label>Preço de Venda</label>
              <Input
                name="sell_price"
                placeholder="R$"
                value={sell_price}
              />
            </RegisterDiv>
            <div style={{ width: '14.5vw' }}>
              <label>Preço de Compra</label>
              <Input 
                name="buy_price" 
                placeholder=""
                value={buy_price}
               />
            </div>
          </div>
          <div>
            <label>Fornecedor</label>
            <Select 
              name="provider" 
              placeholder="Fornecedor" 
              options={providers}
              value={providers}
            />
          </div>
          <div>
            <label>Descrição</label>
            <Textarea
              name="description" 
              placeholder="Descrição" 
              value={description}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <RegisterDiv>
              <label>Qtd. por item</label>
              <Input 
                name="quantity" 
                placeholder="" 
                value={quantity}
              />
            </RegisterDiv>
            <div style={{ width: '14.5vw' }}>
              <label>Código</label>
              <Input 
                name="code" 
                placeholder="" 
                value={code}
              />
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
