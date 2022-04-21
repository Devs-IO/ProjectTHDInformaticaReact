import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useCallback, useEffect, useRef, useState } from 'react';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import getValidationErrors from 'utils/getValidationErrors';
import * as Yup from 'yup';
import Select from '../../components/Select';
import api from '../../services/api';
import { Container, Content } from './styles';

import Button from 'components/Button';
import Header from 'components/Header';
import Input from 'components/Input';
import Modal from 'components/Modal';
import { useNavigate } from 'react-router-dom';

interface ClientsData {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  city_id: string;
}

interface modalData {
  text: string;
  type: 'success' | 'error';
}

export const ClientRegister = () => {
  const formRef = useRef<FormHandles>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [modal, setModal] = useState<modalData>({} as modalData);

  const navigate = useNavigate();

  const phoneRegExp = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;

  const cpfRegExp = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

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
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const handleRegister = useCallback(
    async (data: ClientsData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().email('Digite um e-mail válido').required('E-mail obrigatório'),
          name: Yup.string().required('Nome é obrigatório'),
          phone: Yup.string().matches(phoneRegExp, 'Número de telefone inválido').required('Telefone é obrigatório'),
          cpf: Yup.string().matches(cpfRegExp, 'Cpf Inválido').required('CPF é obrigatório'),
          city_id: Yup.string().required('Cidade é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api
          .post('/clients', data)
          .then(() => {
            setModal({
              type: 'success',
              text: 'Cliente cadastrado ',
            });
            setIsModalOpen(true);
            navigate('/clients');
          })
          .catch((err) => {
            const { data } = err.response;
            setModal({
              text: String(data.message),
              type: 'error',
            });
            setIsModalOpen(true);
          })
          .finally();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          setModal({
            text: String(err),
            type: 'error',
          });
          setIsModalOpen(true);

          return;
        }
      }
    },
    [api, modal, navigate]
  );

  return (
    <>
      {' '}
      <Container>
        <Header>Novo Cliente</Header>
        <Content>
          <Form ref={formRef} onSubmit={handleRegister}>
            <div>
              <label>Nome do Cliente</label>
              <Input name="name" placeholder="Nome do Cliente" type="text" required />
            </div>
            <div>
              <label>Telefone</label>
              <Input name="phone" mask="phone" placeholder="(xx) xxxxx-xxxx" type="number" required />
            </div>
            <div>
              <label>Email</label>
              <Input name="email" placeholder="Email" type="text" />
            </div>
            <div>
              <label>CPF</label>
              <Input name="cpf" mask="cpf" placeholder="xxx.xxx.xxx-xx" type="text" />
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
            <Button type="submit" color="#9C1524" className="button_cancel" onClick={() => navigate('/clients')}>
              <BsFillXCircleFill />
              <span>Cancelar</span>
            </Button>
          </Form>
        </Content>
      </Container>
      {isModalOpen && <Modal closeModal={handleCloseModal} type={modal.type} text={modal.text} />}
    </>
  );
};
