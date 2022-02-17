import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import axios from 'axios';
import Button from 'components/Button';
import Header from 'components/Header';
import Input from 'components/Input';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import getValidationErrors from 'utils/getValidationErrors';
import * as Yup from 'yup';
import Select from '../../components/Select';
import api from '../../services/api';
import { Container, Content } from './styles';

type OptionType = {
  value: number;
  label: string;
};

interface ClientsData {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  city: string;
}

export const ClientRegister = () => {
  const formRef = useRef<FormHandles>(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/MG/municipios`);

      const data = result.data.map((d: any) => ({
        value: d.id,
        label: d.nome,
      }));

      setCities(data);
    })();
  }, []);

  const handleRegister = useCallback(async (data: ClientsData) => {
    try {
      console.log(data);
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
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Telefone</label>
            <Input
              name="phone"
              placeholder="Telefone"
              type="text"
              // value={phone}
              // onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <Input
              name="email"
              placeholder="Email"
              type="text"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>CPF</label>
            <Input
              name="cpf"
              placeholder="xxx.xxx.xxx-xx"
              type="text"
              // value={cpf}
              // onChange={(e) => setCpf(e.target.value)}
            />
          </div>
          <div>
            <label>Cidade</label>
            <Select
              name="city"
              options={cities}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Cidades"
              isClearable
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
