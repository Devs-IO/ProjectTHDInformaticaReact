import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  padding: 0.5rem;
  padding-left: 2.0rem;
  width: 100vw;
  height: 100vh;
  /* max-width: 1180px; */

  button {
    height: 55px;
    float: right;
    margin-right: 10px;
    display: flex;

    align-items: center;
    justify-content: center;
    position: relative;

    
    span {
      margin-left: 0.3rem;
    }
  }
`;



export const Content = styled.div`
  padding: 0 30px;
  margin: 32px auto;

  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 24px;
    list-style: none;
    
    label {
      font-weight: bold;
      font-size: 16px;
    }
  }`;