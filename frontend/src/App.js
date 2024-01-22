// frontend/src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import RestaurantPizzaForm from './components/RestaurantPizzaForm';
import PizzaList from './components/PizzaList';

function App() {
  return (
    <Routes>
      <Route path="/restaurants" element={<RestaurantList />} />
      <Route path="/restaurants/:id" element={<RestaurantDetail />} />
      <Route path="/pizzas" element={<PizzaList />} />
      <Route path="/restaurant_pizzas" element={<RestaurantPizzaForm />} />
    </Routes>
  );
}

export default App;
