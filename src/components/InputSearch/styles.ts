import styled from 'styled-components';


export const Container = styled.div`
  background: #ffffff;
  border-radius: 10px;
  border: 2px solid #ffffff;
  padding: 12px;
  width: 80%;
  color: #09090A;
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
    margin-right: 10px;
  }
`;
