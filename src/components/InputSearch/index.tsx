import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const InputSearch: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <AiOutlineSearch size={20} />
      <input defaultValue={defaultValue} ref={inputRef} {...rest} type="text" />
    </Container>
  );
};

export default InputSearch;
