import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Button, Header, Input, Modal, Select, TextArea } from '../../components';

import { useCallback, useEffect, useRef, useState } from 'react';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
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
  provider: {
    value: string;
    label: string;
  };
  provider_id: string;
  category: {
    value: string;
    label: string;
  };
  category_id: string;
  active: boolean;
}

interface modalData {
  text: string;
  type: 'success' | 'error';
}

export const ProductRegister = () => {
  const { id } = useParams();

  const formRef = useRef<FormHandles>(null);

  const [modal, setModal] = useState<modalData>({} as modalData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState<ProductsData>({} as ProductsData);
  const [isUpdate, setIsUpdate] = useState(false);
  const [checkedToggle, setCheckedToggle] = useState(false);

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

  useEffect(() => {
    const loadProduct = async () => {
      const result = await api.get(`/products/${id}`);

      setProduct(result.data);
      setCheckedToggle(result.data.active);
    };

    if (id) {
      setIsUpdate(true);
      loadProduct();
    }
  }, [id]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const handleRegister = useCallback(
    async (data: ProductsData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().max(200, 'Nome Grande demais').required('Nome Obrigat??rio'),
          category_id: Yup.string().required('Categoria Ogrigat??ria'),
          provider_id: Yup.string().required('Fornecedor Obrigat??rio'),
          buy_price: Yup.string().required('Pre??o de Compra Obrigat??rio'),
          sell_price: Yup.string().required('Pre??o de Venda Obrigat??rio'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (isUpdate) {
          data = { ...data, active: checkedToggle };

          console.log('UPDATE', data);
          await api
            .put(`/products/${id}`, data)
            .then(() => {
              setModal({
                type: 'success',
                text: 'Produto atualizado ',
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
        } else {
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
        alert('Erro no cadastro');
      }
    },
    [checkedToggle, id, isUpdate, navigate]
  );

  const handleClick = (ev: any) => {
    setCheckedToggle(ev.target.checked ? true : false);
  };

  const handleSelectCategory = useCallback((selectedCategory) => {
    setProduct((prev) => ({ ...prev, category: selectedCategory }));
  }, []);

  const handleSelectProvider = useCallback((selectedProvider) => {
    console.log('selectedProvider', selectedProvider);
    setProduct((prev) => ({ ...prev, provider: selectedProvider }));
  }, []);

  return (
    <>
      <Container>
        <Header>Novo Produto</Header>
        <Content>
          <Form ref={formRef} onSubmit={handleRegister}>
            <div>
              <label>Nome do Produto</label>
              <Input name="name" placeholder="Nome do Produto" defaultValue={product.name} required />
            </div>
            <div>
              <label>Tipo</label>
              <Select
                name="category_id"
                placeholder="Categorias"
                options={categories}
                value={product.category}
                onChange={handleSelectCategory}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <RegisterDiv>
                <label>Pre??o de Venda - R$</label>
                <Input
                  name="sell_price"
                  mask="currency"
                  placeholder="xx,xx"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={product.sell_price}
                />
              </RegisterDiv>
              <div style={{ width: '14.5vw' }}>
                <label>Pre??o de Compra - R$</label>
                <Input
                  name="buy_price"
                  mask="currency"
                  placeholder="xx,xx"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={product.buy_price}
                />
              </div>
            </div>
            <div>
              <label>Fornecedor</label>
              <Select
                name="provider_id"
                placeholder="Fornecedor"
                options={providers}
                value={product.provider}
                onChange={handleSelectProvider}
              />
            </div>
            <div>
              <label>Descri????o</label>
              <TextArea name="description" placeholder="Descri????o" defaultValue={product.description} />
            </div>
            <div style={{ display: 'flex' }}>
              <RegisterDiv>
                <label>Qtd. por item</label>
                <Input
                  name="quantity"
                  mask="quantity"
                  placeholder="xx"
                  type="text"
                  pattern="\d+(,\d\d)?"
                  defaultValue={product.quantity}
                />
              </RegisterDiv>
              <RegisterDiv>
                <label>C??digo</label>
                <Input name="code" placeholder="" defaultValue={product.code} />
              </RegisterDiv>

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
            </div>
            <Button type="submit">
              <BsFillCheckCircleFill />
              {isUpdate ? <span>Atualizar</span> : <span>Cadastrar</span>}
            </Button>
            <Button type="submit" color="#9C1524" className="button_cancel" onClick={() => navigate('/products')}>
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
