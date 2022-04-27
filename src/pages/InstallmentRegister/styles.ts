import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  padding: 0.5rem;
  padding-left: 2.0rem;
  width: 100vw;
  height: 100vh;
  /* max-width: 1180px; */
  `;

export const Content = styled.div`
  padding: 0 30px;
  margin: 32px auto;

  form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 24px;
    list-style: none;
    
    label {
      font-weight: bold;
      font-size: 16px;
    }

    button {
    width: 200px;
    height: 55px;
    display: block;
    position: absolute;
    bottom: 0.7rem;
    margin-right: auto;
    right: 45px;
    
      span {
        margin-left: 0.3rem;
          }
    }

    .button_cancel { 
      right: 255px;
      }
  }
`;