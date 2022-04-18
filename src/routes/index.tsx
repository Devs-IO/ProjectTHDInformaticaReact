import { ProductRegister } from 'pages/ProductRegister';
import { Routes as Switch, Route, Navigate } from 'react-router-dom';

import { Home, Product, Register, Client, Sales, ClientRegister, SaleRegister } from '../pages';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate replace to="/home" />} />
      <Route path="/products" element={<Product />} />
      <Route path="/products/new" element={<ProductRegister />} />
      <Route path="/clients" element={<Client />} />
      <Route path="/clients/new" element={<ClientRegister />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/sales/new" element={<SaleRegister />} />
    </Switch>
  );
};
