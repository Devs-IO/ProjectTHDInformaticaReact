import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Button, Header, Input, Select } from '../../components';

import getValidationErrors from 'utils/getValidationErrors';

import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import api from '../../services/api';
import { Container, Content, RegisterDiv } from './styles';

interface ClientsData {
  value: string;
  label: string;
  phone: string;
  city: string;
}

export const SellRegister = () => {

  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const [clients, setClients] = useState<ClientsData[]>([]);
  const [client, setClient] = useState<ClientsData>();
  const [product, setProducts] = useState([]);
  const [status, setStatus] = useState([]);
  const [payment, setPayment] = useState([]);

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const dateNow = today.toLocaleDateString();

  const paymentOptions = [
    {
      value: '1',
      label: 'À vista',
    },
    {
      value: '2',
      label: 'Parcelado',
    },
  ];


  useEffect(() => {
    (async () => {
      const clientResult = await api.get(`/clients/active`);

      const clientData = clientResult.data.map((c: any) => ({
        value: c.id,
        label: c.name,
        phone: c.phone,
        city: c.city,
      }));

      setClients(clientData);
    })();
    (async () => {
      const productResult = await api.get(`/products/active`);

      const productData = productResult.data.map((p: any) => ({
        value: p.id,
        label: p.name,
      }));

      setProducts(productData);
    })();
    (async () => {
      const statusResult = await api.get(`/status`);

      const statusData = statusResult.data.map((p: any) => ({
        value: p.id,
        label: p.paid,
      }));

      setStatus(statusData);
    })();
    (async () => {
      const paymentResult = await api.get(`/payment`);

      const paymentData = paymentResult.data.map((p: any) => ({
        value: p.id,
        label: p.options,
      }));

      setPayment(paymentData);
    })();
  }, []);

  const handleLogin = useCallback(async (data: any) => {
    try {
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
    }
  }, []);

  const handleSelectClient = useCallback((selectedClient) => {
    setClient(selectedClient);
  }, []);

  return (
    <Container>
      <Header>Cadastro de Vendas</Header>
      <Content>
        <Form ref={formRef} onSubmit={handleLogin}>
          <div>
            <label>Nome</label>
            <Select 
              name="client_id" 
              options={clients} 
              onChange={handleSelectClient}
              placeholder="Escolha um Cliente" 
              isClearable 
              required 
            />
          </div>
          <div className='disabled'>
            <label>Telefone</label>
            <Input 
              className="disabled_input"
              defaultValue={client?.phone}
              name="phone" 
              disabled
            />
          </div>
          <div className='disabled'>
            <label>Cidade</label>
            <Input 
              name="city"
              defaultValue={client?.city}
              disabled 
            />
          </div>

          <div>
            <label>Produtos</label>
            <Select 
            name="product_id" 
            options={product} 
            placeholder="Escolha um Produto" 
            isClearable 
            required 
            />
          </div>

          <div>
            <label>Formas de Pagamento</label>
            <Select 
            name="paymentForm_id" 
            placeholder="Forma de Pagamento"
            options={payment}
            isClearable 
            required 
            />
          </div>
          
          <div>
            <label>Meios de Pagamento</label>
            <Select 
              name="paymentmeans_id" 
              options={paymentOptions}
              placeholder="Meio de Pagamento" 
              isClearable 
              required 
            />
          </div>
          <div>
            <label>Lista de Produtos</label>
            <Input 
            name="productlist_id" 
            disabled
             />
          </div>
          
          <div className='flex'>
            <RegisterDiv>
              <div>
                <label>Desconto</label>
                <Input 
                name="discount_id" 
                placeholder="Desconto" 
                type="text" 
                />
              </div>
            </RegisterDiv>
            <RegisterDiv>
              <div>
                <label>Preço Total</label>
                <Input 
                name="totalprice_id" 
                placeholder="R$00.00" 
                disabled 
                />
              </div>
            </RegisterDiv>
          </div>

          <div>
            <label>Status do Pedido</label>
            <Select 
            name="orderstatus_id" 
            placeholder="Escolha o status do pedido" 
            options={status}
            required 
            />
          </div>
          
          <div className='register'>
            <RegisterDiv>
              <div className='disabled'>
                <label>Data de Venda</label>
                <Input 
                  name="sellDate_id" 
                  placeholder="Data da Venda"
                  defaultValue={dateNow}
                  disabled 
                />
              </div>
            </RegisterDiv>
            <RegisterDiv>
              <div className='disabled'>
                <label>Código</label>
                <Input 
                  name="code_id" 
                  disabled 
                />
              </div>
            </RegisterDiv>
          </div>
          
          <Button type="submit">
            <BsFillCheckCircleFill />
            <span>Salvar</span>
          </Button>
          <Button type="submit" color="#9C1524" className="button_cancel" onClick={() => navigate('/sells')}>
            <BsFillXCircleFill />
            <span>Cancelar</span>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};
