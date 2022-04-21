import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #ffffff;
  border-radius: 10px;
  border: 2px solid #ffffff;
  padding: 10px;
  color: #09090A;
  width: 100%;
  display: flex;
  margin-top: 8px;
  align-items: center;
  & + div {
    margin-top: 8px;
  }
  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      color: #0D3C84;
      border-color: #0D3C84;
    `}
  ${(props) =>
    props.isFilled &&
    css`
      color: #0D3C84;
    `}
  input {
    /* flex: 1; */
    background: transparent;
    width: 100%;
    border: 0;
    color: #CCCCCC;
    &::placeholder {
      color: #666360;
    }
  }
  svg {
    margin-right: 16px;
  }
`;
