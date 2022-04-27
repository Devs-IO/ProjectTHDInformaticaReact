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
    align-items: center;
    text-align: center;
    
    thead>tr {
      background: #2B4C7E;
      color: white;
    }

    thead>tr>th:first-child {
      display: none; // hide the first column
    }

    tbody>tr>td:first-child {
      display: none; // hide the first column
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

    a {
      padding: 5px;
      text-decoration: none;
      color: #09090a;
    }

    svg {
      outline: none;
      cursor: pointer;
    }


  }
`