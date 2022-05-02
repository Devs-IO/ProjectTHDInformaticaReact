import { useField } from '@unform/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactSelect, { OptionTypeBase, Props as SelectProps } from 'react-select';
import { Container } from './styles';

interface PropsSelect extends SelectProps<OptionTypeBase> {
  name: string;
}

export const Select: React.FC<PropsSelect> = ({ 
  name, 
  ...rest 
}: PropsSelect) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
      setValue: (ref, value) => {
        ref.select.setValue(value || null);
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <>
      <Container isErrored={!!error} isFocused={isFocused}>
        <ReactSelect
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={selectRef}
          {...rest}
        />
      </Container>
    </>
  );
};
