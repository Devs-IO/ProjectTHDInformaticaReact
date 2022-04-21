import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  width: 100%;
  max-width: 400px;
  padding: 2rem 3rem;
  border-radius: 8px;
  box-shadow: 0 0 60px rgba(242, 243, 245, 0.05);
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  img {
    height: 150px;
    margin-bottom: 24px;
  }
  strong {
    font-weight: 700;
  }

`;

export const Image = styled.img`
    padding-left: 70px;
`;

export const Text = styled.p`
  font-family: Poppins, sans-serif;
  font-size: 18px;
  margin: 5% 0%;
  text-align: center;
`;
export const Button = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  background: transparent;
  border: 0;
  font-size: 0;
`;