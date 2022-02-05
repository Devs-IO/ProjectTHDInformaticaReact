import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useCallback, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RiFileEditLine } from 'react-icons/ri';

import getValidationErrors from 'utils/getValidationErrors';
import Button from 'components/Button';
import Header from 'components/Header';
import InputSearch from 'components/InputSearch';

import { Container, Content } from './styles';

export const Client = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

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
      <Link to="/clients/new">
        <Button type="button">
          <RiFileEditLine />
          <span>Cadastrar Clientes</span>
        </Button>
      </Link>
      <Header>Clientes</Header>
      <Content>
        <Form ref={formRef} onSubmit={handleLogin}>
          <InputSearch name="search" placeholder="Buscar Clientes" />
        </Form>
        <p>
          {' '}
          ksadkaskdasdasjkdhakshdjahsjdhashdjkashdhaskjdhajskhdjkahdjkhakjdhasjhdjkahdas
          hhaskhashdkahkksadkaskdasdasjkdhakshdjahsjdhashdjkashdhaskjdhajskhdjkahdjkhakjdh
          asjhdjkahdashhaskhashdkahkksadkaskdasdasjkdhakshdjahsjdhashdjkashdhaskjdhajskhdj
          kahdjkhakjdhasjhdjkahdashhaskhashdkahkksadkaskdasdasjkdhakshdjahsjdhashdjkashdhas
          kjdhajskhdjkahdjkhakjdhasjhdjkahdashhaskhashdkahkksadkaskdasdasjkdhakshdjahsjdhas
          hdjkashdhaskjdhajskhdjkahdjkhakjdhasjhdjkahdashhaskhashdkahkksadkaskdasdasjkdhaks
          hdjahsjdhashdjkashdhaskjdhajskhdjkahdjkhakjdhasjhdjkahdashhaskhashdkahkksadkaskda
          sdasjkdhakshdjahsjdhashdjkashdhaskjdhajskhdjkahdjkhakjdhasjhdjkahdashhaskhashdkah
          kksadkaskdasdasjkdhakshdjahsjdhashdjkashdhaskjdhajskhdjkahdjkhakjdhasjhdjkahdashh
          askhashdkahkksadkaskdasdasjkdhakshdjahsjdhashdjkashdhaskjdhajskhdjkahdjkhakjdhasj
          hdjkahdashhaskhashdkahkksadkaskdasdasjkdhakshdjahsjdhashdjkashdhaskjdhajskhdjkahd
          jkhakjdhasjhdjkahdashhaskhashdkahkksadkaskdasdasjkdhakshdjahsjdhashdjkashdhaskjdh
          ajskhdjkahdjkhakjdhasjhdjkahdashhaskhashdkahkksadkaskdasdasjkdhakshdjahsjdhashdjka
          shdhaskjdhajskhdjkahdjkhakjdhasjhdjkahdashhaskhashdkahkksadkaskdasdasjkdhakshdjahs
          jdhashdjkashdhaskjdhajskhdjkahdjkhakjdhasjhdjkahdashhaskhashdkahkksadkaskdasdasjkd
          hakshdjahsjdhashdjkashdhaskjdhajskhdjkahdjkhakjdhasjhdjkahdashhaskhashdkahkksadkas
          kdasdasjkdhakshdjahsjdhashdjkashdhaskjdhajskhdjkahdjkhakjdhasjhdjkahdashhaskhashdk
          ahkksadkaskdasdasjkdhakshdjahsjdhashdjkashdhaskjdhajskhdjkahdjkhakjdhasjhdjkahdash
          haskhashdkahkksadkaskdasdasjkdhakshdjahsjdhashdjka shdhaskjdhajskhdjkahdjkhakjdhasjhdjkahdashhaskhashdkahk
        </p>
      </Content>
    </Container>
  );
};
