import { Navigate, Route, Routes as Switch } from 'react-router-dom';

import { Client, ClientRegister, Home, Product, ProductRegister, Register, SaleRegister, Sales } from '../pages';

export const Routes = () => {
  return (
    <Switch>
      <Route path="*" element={<Navigate replace to="/home" />} />
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Product />} />
      <Route path="/products/new" element={<ProductRegister />} />
      <Route path="/clients" element={<Client />} />
      <Route path="/clients/new" element={<ClientRegister />} />
      <Route path="/clients/:id" element={<ClientRegister />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/sales/new" element={<SaleRegister />} />
    </Switch>
  );
};
