import styled from 'styled-components';

export const Container = styled.aside`
  width: 400px;
  height: 100vh;
  top: 0px;
  padding-top: 0px;
  position: relative;
  background: #fff;

  button {
    width: 90%;
    height: 45px;
    margin-left: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0.7rem;
    
    span {
      margin-left: 0.3rem;
    }
  }


  img {
    padding-bottom: 30px;
  }
`;

export const Nav = styled.nav`

  li {
      width: 85%;
      height: 48px;

      margin: 10px 0px;
      padding-left: 24px;
      border-radius: 0px 24px 24px 0px;
      background-color: #CEE0DC;

      font-family: Poppins, Roboto, sans-serif;
      font-weight: bold;
      color: #1F1F20;

      display: flex;
      align-items: center;

      transition: width .5s;
  };

  li svg {
    width: 40px;
    height: 20px;
  }

  li a {
    width: 100%;
    line-height: 48px;
    font-size: 18px;
    text-decoration: none;
    color: #09090A;
    margin-left: 20px;
  };  

  li.selected {
    background: #0D3C84;
    width: 95%;
  }

  li.selected svg {
      filter: invert(1) brightness(1);
  }

  li.selected a {
      color: #fff;
  }


`;