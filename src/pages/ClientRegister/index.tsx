import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import axios from 'axios';
import Button from 'components/Button';
import Header from 'components/Header';
import Input from 'components/Input';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import ReactModal from 'react-modal';
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
  city_id: string;
}

export const ClientRegister = () => {
  const formRef = useRef<FormHandles>(null);
  const [showModal, setShowModal] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await api.get(`/cities`);

      const data = result.data.map((d: any) => ({
        value: d.id,
        label: d.name,
      }));

      setCities(data);
    })();
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const handleRegister = useCallback(async (data: ClientsData) => {
    try {
      await api.post('/clients', data);
      //alert("Cadastrado com Sucesso!");
      setShowModal(true);
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
      <ReactModal isOpen={showModal}> <button onClick={handleCloseModal}>X</button> <p>Isso é uma Modal</p> 
        </ReactModal>
      <Content>
        <Form ref={formRef} onSubmit={handleRegister}>
          <div>
            <label>Nome do Cliente</label>
            <Input
              name="name"
              placeholder="Nome do Cliente"
              type="text"
              required
            />
          </div>
          <div>
            <label>Telefone</label>
            <Input
              name="phone"
              placeholder="Telefone"
              type="text"
              required
            />
          </div>
          <div>
            <label>Email</label>
            <Input
              name="email"
              placeholder="Email"
              type="text"
            />
          </div>
          <div>
            <label>CPF</label>
            <Input
              name="cpf"
              placeholder="xxx.xxx.xxx-xx"
              type="text"
            />
          </div>
          <div>
            <label>Cidade</label>
            <Select
              name="city_id"
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
