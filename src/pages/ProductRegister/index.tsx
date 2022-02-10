import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Button from 'components/Button';
import Header from 'components/Header';
import Input from 'components/Input';

import { useCallback, useRef } from 'react';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import getValidationErrors from 'utils/getValidationErrors';

import { Container, Content, RegisterDiv, Textarea } from './styles';

export const ProductRegister = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const handleRegister = useCallback(async (data: any) => {
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
      <Header>Novo Cliente</Header>
      <Content>
        <Form ref={formRef} onSubmit={handleRegister}>
          <div>
            <label>Nome do Produto</label>
            <Input name="name" placeholder="Nome do Produto" required />
          </div>
          <div>
            <label>Tipo</label>
            <datalist>
              <option>Tipo A</option>
              <option>tipo B</option>
            </datalist>
          </div>
          <div style={{ display: 'flex' }}>
            <RegisterDiv>
              <label>Preço de Venda</label>
              <Input name="sell" placeholder="" />
            </RegisterDiv>
            <div style={{ width: '14.5vw' }}>
              <label>Preço de Compra</label>
              <Input name="buy" placeholder="" />
            </div>
          </div>
          <div>
            <label>Fornecedor</label>
            <Input name="provider" placeholder="Fornecedor" />
          </div>
          <div>
            <label>Descrição</label>
            <Textarea name="description" placeholder="Descrição" />
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
