import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Button from 'components/Button';
import Header from 'components/Header';
import Input from 'components/Input';
import Modal from 'components/Modal';
import Select from 'components/Select';
import TextArea from 'components/TextArea';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
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

interface modalData {
  text: string;
  type: 'success' | 'error';
}

export const ProductRegister = () => {
  const formRef = useRef<FormHandles>(null);

  const [modal, setModal] = useState<modalData>({} as modalData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const providerResult = await api.get('/providers');
      const providerData = providerResult.data.map((p: any) => ({
        value: p.id,
        label: p.name,
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

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const handleRegister = useCallback(
    async (data: ProductsData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().max(200, 'Nome Grande demais').required('Nome Obrigatório'),
          category_id: Yup.string().required('Categoria Ogrigatória'),
          provider_id: Yup.string().required('Fornecedor Obrigatório'),
          buy_price: Yup.string().required('Preço de Compra Obrigatório'),
          sell_price: Yup.string().required('Preço de Venda Obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api
          .post('/products', data)
          .then(() => {
            setModal({
              type: 'success',
              text: 'Produto cadastrado ',
            });
            setIsModalOpen(true);
            navigate('/products');
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
        alert('Erro no cadastro');
      }
    },
    [api, modal, navigate]
  );

  return (
    <>
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
                <label>Preço de Venda - R$</label>
                <Input name="sell_price" mask="currency" placeholder="xx,xx" type="number" step="0.01" min="0" />
              </RegisterDiv>
              <div style={{ width: '14.5vw' }}>
                <label>Preço de Compra - R$</label>
                <Input name="buy_price" mask="currency" placeholder="xx,xx" type="number" step="0.01" min="0" />
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
                <Input name="quantity" mask="quantity" placeholder="xx" type="text" pattern="\d+(,\d\d)?" />
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
      {isModalOpen && <Modal closeModal={handleCloseModal} type={modal.type} text={modal.text} />}
    </>
  );
};
