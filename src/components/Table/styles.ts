import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem;

  table {
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.8rem;
    border-spacing: 0;
    border-radius: 5px 5px 0px 0px;
    font-size: 16px;

    thead>tr {
      background: #2B4C7E;
      color: white;
    }

    tbody {
        tr:nth-child(even) {
          background: #fff;
        }
        tr:nth-child(odd) {
          background: #f0f0f0;
        }
  } 

  tr {
    height: 48px;
  }

  th,
  td {
    padding: 20px;
  }


  }
`