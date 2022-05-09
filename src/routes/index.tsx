import { Navigate, Route, Routes as Switch } from 'react-router-dom';

import { Client, ClientRegister, Home, Product, ProductRegister, Register, SellRegister, Sells, InstallmentRegister } from '../pages';

export const Routes = () => {
  return (
    <Switch>
      <Route path="*" element={<Navigate replace to="/home" />} />
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Product />} />
      <Route path="/products/new" element={<ProductRegister />} />
      <Route path="/products/:id" element={<ProductRegister />} />
      <Route path="/clients" element={<Client />} />
      <Route path="/clients/new" element={<ClientRegister />} />
      <Route path="/clients/:id" element={<ClientRegister />} />
      <Route path="/sells" element={<Sells />} />
      <Route path="/sells/new" element={<SellRegister />} />
      <Route path="/sells/:id" element={<SellRegister />} />
      <Route path="/sells/new/installment" element={<InstallmentRegister />} />
    </Switch>
  );
};
