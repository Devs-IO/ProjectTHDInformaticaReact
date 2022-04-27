import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Button, Header, Input, Modal, Select } from '../../components';

import { useCallback, useEffect, useRef, useState } from 'react';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import getValidationErrors from 'utils/getValidationErrors';
import * as Yup from 'yup';
import api from '../../services/api';
import { Container, Content } from './styles';

interface ClientsData {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  city_id: string;
  active: boolean;
}

interface modalData {
  text: string;
  type: 'success' | 'error';
}

export const ClientRegister = () => {
  const { id } = useParams();

  const formRef = useRef<FormHandles>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [modal, setModal] = useState<modalData>({} as modalData);
  const [client, setClient] = useState<ClientsData>({} as ClientsData);
  const [isUpdate, setIsUpdate] = useState(false);
  const [checkedToggle, setCheckedToggle] = useState(false);

  const navigate = useNavigate();

  // const phoneRegExp = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;
  // const cpfRegExp = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

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

  useEffect(() => {
    const loadClient = async () => {
      const result = await api.get(`/clients/${id}`);

      setClient(result.data);
      setCheckedToggle(result.data.active);
    };

    if (id) {
      setIsUpdate(true);
      loadClient();
    }
  }, [id]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const handleSubmit = useCallback(
    async (data: ClientsData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().email('Digite um e-mail válido').required('E-mail obrigatório'),
          name: Yup.string().required('Nome é obrigatório'),
          phone: Yup.string().required('Telefone é obrigatório'),
          cpf: Yup.string().required('CPF é obrigatório'),
          city_id: Yup.string().required('Cidade é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (isUpdate) {
          data = { ...data, active: checkedToggle };

          console.log('UPDATE', data);
          await api
            .put(`/clients/${id}`, data)
            .then(() => {
              setModal({
                type: 'success',
                text: 'Cliente atualizado ',
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
        } else {
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
        }
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
    [checkedToggle, id, isUpdate, navigate]
  );

  const handleClick = (ev: any) => {
    setCheckedToggle(ev.target.checked ? true : false);
  };

  return (
    <>
      <Container>
        <Header>Novo Cliente</Header>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label>Nome do Cliente</label>
              <Input name="name" placeholder="Nome do Cliente" type="text" defaultValue={client.name} required />
            </div>
            <div>
              <label>Telefone</label>
              <Input
                name="phone"
                mask="phone"
                placeholder="(xx) xxxxx-xxxx"
                type="number"
                defaultValue={client.phone}
                required
              />
            </div>
            <div>
              <label>Email</label>
              <Input name="email" placeholder="Email" type="text" defaultValue={client.email} />
            </div>
            <div>
              <label>CPF</label>
              <Input name="cpf" mask="cpf" placeholder="xxx.xxx.xxx-xx" type="text" defaultValue={client.cpf} />
            </div>
            <div>
              <label>Cidade</label>
              <br />
              <Select
                name="city_id"
                options={cities}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Cidades"
                // value={client.city_id}
                isClearable
              />
            </div>
            {isUpdate ? (
              <div>
                <label>Status Cliente</label>
                <br />
                <br />
                <Toggle name="active" onChange={(ev: any) => handleClick(ev)} checked={checkedToggle} />
              </div>
            ) : (
              <></>
            )}
            <Button type="submit">
              <BsFillCheckCircleFill />
              {isUpdate ? <span>Atualizar</span> : <span>Cadastrar</span>}
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
