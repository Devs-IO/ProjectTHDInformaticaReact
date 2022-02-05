import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useCallback, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BsFillXCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';

import getValidationErrors from 'utils/getValidationErrors';
import Button from 'components/Button';
import Header from 'components/Header';
import InputSearch from 'components/InputSearch';

import { Container, Content } from './styles';
import Input from 'components/Input';

export const ClientRegister = () => {
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
            <label>Nome do Cliente</label>
            <Input name="search" placeholder="Nome do Cliente" required />
          </div>
          <div>
            <label>Telefone</label>
            <Input name="phone" placeholder="Telefone" required />
          </div>
          <div>
            <label>Email</label>
            <Input name="email" placeholder="Email" />
          </div>
          <div>
            <label>CPF</label>
            <Input name="cpf" placeholder="xxx.xxx.xxx-xx" />
          </div>
          <div>
            <label>Cidade</label>
            <Input name="city" placeholder="Cidade" />
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
        <p>
          {' '}
          ksadkaskdasdasjkdhakshdjahsjdhashdjkashdhaskjdhajskhdjkahdjkhakjdhasjhdjkahdas
          hhaskhashdkahkksadkaskdasdasjkdhakshdjahsjdhashdjkashdhaskjdhajskhdjkahdjkhakjdh
          asjhdjkahdashhaskhashdkahkksadkaskdasdasjkdhakshdjahsjdhashdjkashdhaskjdhajskhdj
        </p>
      </Content>
    </Container>
  );
};
