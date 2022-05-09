import styled from 'styled-components';


export const Container = styled.div`
  background: #ffffff;
  border-radius: 10px;
  border: 2px solid #ffffff;
  padding: 10px;
  width: 98%;

  margin-left: 15px;

  color: #09090A;
  margin-top: 8px;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
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
