
import styled from 'styled-components';
import { shade } from 'polished';

import signInBackground from '../assets/Home/HomeImage.png';


export const Container = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  background: url(${signInBackground}) no-repeat center;
  background-size: cover; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
`;

export const Content = styled.div`
  position: absolute;
  width: 386px;
  height: auto;
  padding: 40px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 62px;
  top: 30%;
  left: 5%;

  form a {
    color: #F3F3F3;
    font-size: 1.5em;
    text-decoration: none;
    transition: color 0.2s;
    position: absolute;
    top: 15%;
    left: 15%;
    &:hover {
      color: ${shade(0.5, '#F3F3F3')};
    }
    & + a {
      left: 45%;
    }
  }
`;
