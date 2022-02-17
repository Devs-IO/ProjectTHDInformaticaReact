import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import axios from 'axios';
import api from 'services/api';

import Button from 'components/Button';
import Header from 'components/Header';
import Input from 'components/Input';

import { useCallback, useRef, useEffect, useState } from 'react';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import getValidationErrors from 'utils/getValidationErrors';

import { Container, Content, RegisterDiv, Textarea } from './styles';
import Select from 'components/Select';

interface ProductsData {
  id: string;
  sell: string;
  buy: string;
  description: string;
  quantity: string;
  code: string;
}

export const ProductRegister = () => {
  const formRef = useRef<FormHandles>(null);
  const [name, setName] = useState("");
  const [sell, setSell] = useState("");
  const [buy, setBuy] = useState("")
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState("")
  const [code, setCode] = useState("")

  const handleRegister = useCallback(async (data: ProductsData) => {
    try {
      console.log(data);
      await api.post('/products', data);
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
      <Header>Novo Cliente</Header>
      <Content>
        <Form ref={formRef} onSubmit={handleRegister}>
          <div>
            <label>Nome do Produto</label>
            <Input 
              name="name"
              placeholder="Nome do Produto" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required />
          </div>
          <div>
            <label>Tipo</label>
            <Select name='types' placeholder='Categorias' ></Select>
          </div>
          <div style={{ display: 'flex' }}>
            <RegisterDiv>
              <label>Preço de Venda</label>
              <Input
                name="sell"
                placeholder="R$"
                value={sell}
              onChange={(e) => setSell(e.target.value)} />
            </RegisterDiv>
            <div style={{ width: '14.5vw' }}>
              <label>Preço de Compra</label>
              <Input 
                name="buy" 
                placeholder=""
                value={buy}
                onChange={(e) => setBuy(e.target.value)}
               />
            </div>
          </div>
          <div>
            <label>Fornecedor</label>
            <Input name="provider" placeholder="Fornecedor" />
          </div>
          <div>
            <label>Descrição</label>
            <Textarea 
              name="description" 
              placeholder="Descrição" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <RegisterDiv>
              <label>Qtd. por item</label>
              <Input 
                name="quantity" 
                placeholder="" 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </RegisterDiv>
            <div style={{ width: '14.5vw' }}>
              <label>Código</label>
              <Input 
                name="code" 
                placeholder="" 
                value={code}
                onChange={(e) => setCode(e.target.value)}
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
