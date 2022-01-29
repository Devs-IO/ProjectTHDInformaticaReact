import { Routes as Switch, Route, Navigate } from 'react-router-dom';

import { Home, Product, Register, Client, Sales } from '../pages';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate replace to="/home" />} />
      <Route path="/products" element={<Product />} />
      <Route path="/clients" element={<Client />} />
      <Route path="/sales" element={<Sales />} />
    </Switch>
  );
};
