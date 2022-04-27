import { BsBoxArrowInLeft, BsFillPeopleFill } from 'react-icons/bs';
import { FaBoxOpen, FaHandHoldingUsd } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import logo from 'assets/Menu/logo.svg';
import { Button } from 'components';
import { Container, Nav } from './styles';

export const Menu = (props: any) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const listItems = [
    { name: 'Vendas', path: '/sells', icon: <FaHandHoldingUsd /> },
    { name: 'Produtos', path: '/products', icon: <BsFillPeopleFill /> },
    { name: 'Clientes', path: '/clients', icon: <FaBoxOpen /> },
  ];

  const hiddenMenuPages = ['/', '/home', '/register'];

  function signOut() {
    navigate('/home');
  }

  return (
    <>
      {!hiddenMenuPages.includes(pathname) && (
        <Container>
          <img src={logo} alt="Logo" />
          <Nav>
            <ul>
              {listItems.map((item) => (
                <li key={item.name} className={pathname.includes(item.path) ? 'selected' : undefined}>
                  {item.icon}
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </Nav>
          <Button type="submit" color="#9C1524" onClick={signOut}>
            <BsBoxArrowInLeft />
            <span>Sair</span>
          </Button>
        </Container>
      )}
    </>
  );
};
