import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Button, Header, Input, Select } from '../../components';

import getValidationErrors from 'utils/getValidationErrors';

import api from '../../services/api';
import { Container, Content } from './styles';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';

export const SellRegister = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const [client, setClients] = useState([]);
  const [product, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const clientresult = await api.get(`/clients`);

      const clientdata = clientresult.data.map((c: any) => ({
        value: c.id,
        label: c.name,
      }));

      setClients(clientdata);
    })();
    (async () => {
      const productresult = await api.get(`/products`);

      const productdata = productresult.data.map((p: any) => ({
        value: p.id,
        label: p.name,
      }));

      setProducts(productdata);
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

  return (
    <Container>
      <Header>Cadastro de Vendas</Header>
      <Content>
        <Form ref={formRef} onSubmit={handleLogin}>
          <div>
            <label>Nome</label>
            <Select 
            name="client_id" 
            options={client} 
            placeholder="Escolha um Cliente" 
            isClearable 
            required 
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
            name="paymentform_id" 
            placeholder="Forma de Pagamento" 
            isClearable 
            required 
            />
          </div>
          <div>
            <label>Telefone</label>
            <Input 
            className="disabled_input" 
            name="phone_id" 
            disabled 
            required 
            />
          </div>
          <div>
            <label>Cidade</label>
            <Input 
            name="city_id" 
            disabled 
            required 
            />
          </div>
          <div>
            <label>Meios de Pagamento</label>
            <Select 
            name="paymentmeans_id" 
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
          <div>
            <label>Desconto</label>
            <Input 
            name="discount_id" 
            placeholder="Desconto" 
            type="text" 
            />
          </div>
          <div>
            <label>Preço Total</label>
            <Input 
            name="totalprice_id" 
            placeholder="R$00.00" 
            disabled 
            />
          </div>
          <div>
            <label>Status do Pedido</label>
            <Select 
            name="orderstatus_id" 
            placeholder="Escolha o status do pedido" 
            required 
            />
          </div>
          <div>
            <label>Data de Venda</label>
            <Input 
            name="selldate_id" 
            placeholder="Data da Venda" 
            disabled 
            />
          </div>
          <div>
            <label>Codígo</label>
            <Input 
            name="code_id" 
            disabled 
            />
          </div>
            <Button type="submit">
            <BsFillCheckCircleFill />
            <span>Salvar</span>
            </Button>
            <Button type="submit" color="#9C1524" className="button_cancel" onClick={() => navigate('/sales/new')}>
            <BsFillXCircleFill />
              <span>Cancelar</span>
            </Button>
        </Form>
      </Content>
    </Container>
  );
};
