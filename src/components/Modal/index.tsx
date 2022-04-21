import iconApproved from 'assets/icons/approved-signal.svg';
import iconError from 'assets/icons/error-signal.svg';
import React from 'react';
import { FiX } from 'react-icons/fi';
import ReactModal from 'react-modal';
import { Button, Container, Image, Text } from './styles';

const customStyles = {
  content: {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface ModalProps {
  closeModal: () => void;
  type: 'success' | 'error';
  text: string;
}

const Modal: React.FC<ModalProps> = ({ closeModal, type, text }) => {
  const types = {
    error: {
      image: iconError,
      alt: 'Ícone Erro',
      color: '#DC2438',
      message: <Text>{text}</Text>,
    },
    success: {
      image: iconApproved,
      alt: 'Ícone Aprovado',
      color: '#30CC57',
      message: (
        <Text>
          {text}
          <br />
          com sucesso!
        </Text>
      ),
    },
  };

  return (
    <Container>
      <ReactModal isOpen={true} style={customStyles}>
        <Image src={types[type].image} alt={types[type].alt}></Image>

        {types[type].message}

        <Button onClick={closeModal}>
          <FiX size={14} color="#000" />
        </Button>
      </ReactModal>
    </Container>
    //   <Overlay>
    //     <Container colorText={data.color}>
    //       <img src={data.image} alt="Lixeira" />
    //       <strong>{data.text}</strong>
    //       <Button onClick={closeModal}>
    //         <FiX size={24} color="#000" />
    //       </Button>
    //     </Container>
    //   </Overlay>
  );
};

export default Modal;
