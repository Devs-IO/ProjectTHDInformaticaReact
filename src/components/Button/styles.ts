import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  position: relative;
  width: 163px;
  height: 34px;
  margin-top: 20px;
  margin-left: 22%;
  background: #0D3C84;
  box-sizing: border-box;
  border-radius: 10px;
  border: 0;
  color: #FFFFFF;
  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.5, '#0D3C84')};
  }
`;