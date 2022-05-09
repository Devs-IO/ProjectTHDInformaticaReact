import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #ffffff;
  padding: 1px;
  width: 100%;

  margin-top: 8px;

  border-radius: 10px;
  border: 2px solid #ffffff;
  color: #09090A;
  transition: 0.2s;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isFocused &&
    css`
      > svg {
        color: #0D3C84;
      }
      border-color: #0D3C84;
;
    `}

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  > div {
    width: 100%;
    border: 0;

    > div {
      flex: 1;

      background: #ffffff;
      color: #09090A;
      border: none;

      .react-select__option {
        border: none;
        background-color: #ffffff;
        color: #232129;
      }
    }
  }

  > svg {
    margin: 0 10px 0 5px;
  }
`;

