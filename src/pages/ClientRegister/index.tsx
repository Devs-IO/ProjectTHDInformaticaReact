import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useCallback, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BsFillXCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';
import api from '../../services/api';

import getValidationErrors from 'utils/getValidationErrors';
import Button from 'components/Button';
import Header from 'components/Header';
import InputSearch from 'components/InputSearch';

import { Container, Content } from './styles';
import Input from 'components/Input';

export const ClientRegister = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [city, setCity] = useState('');

  const handleRegister = useCallback(async (data: any) => {
    try {
      await api.post('/clients', data);
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
            <Input
              name="name"
              placeholder="Nome do Cliente"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Telefone</label>
            <Input
              name="phone"
              placeholder="Telefone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <Input
              name="email"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>CPF</label>
            <Input
              name="cpf"
              placeholder="xxx.xxx.xxx-xx"
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>
          <div>
            <label>Cidade</label>
            <Input
              name="city"
              placeholder="Cidade"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
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
