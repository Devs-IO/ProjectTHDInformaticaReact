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
  padding: 16px;
  color: #09090A;
  /* width: 100%; */
  display: flex;
  margin-top: 8px;
  align-items: center;
  & + div {
    margin-top: 8px;
  }
  resize: none;
  width: -webkit-fill-available;
  height: 25vh;
  font-family: 'Roboto Slab',serif;
  font-size: 16px;
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
  /* input {
    background: transparent;
    border: 0;
    color: #CCCCCC;
    &::placeholder {
      color: #666360;
    }
  } */
  svg {
    margin-right: 16px;
  }
`;
