import styled from 'styled-components';

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
    display: inline-grid;
    grid-template-columns: 30vw 1fr;
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

// export const Datalist = styled.datalist`
//   background: #ffffff;
//   border-radius: 10px;
//   border: 2px solid #ffffff;
//   padding: 16px;
//   color: #09090A;
//   /* width: 100%; */
//   margin-top: 8px;
//   & + div {
//   margin-top: 8px;

//   input {
//     /* flex: 1; */
//     background: transparent;
//     border: 0;
//     color: #CCCCCC;
//     &::placeholder {
//       color: #666360;
//     }
// }
// `

export const RegisterDiv = styled.div`
  width: 14.5vw;
  margin-right: 1vw;
`

export const Textarea = styled.textarea`
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
`