// frontend/src/App.js
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import PizzaList from './components/PizzaList';
import RestaurantPizzaForm from './components/RestaurantPizzaForm';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pizzas">Pizza List</Link>
          </li>
          <li>
            <Link to="/create">Create Restaurant Pizza</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/pizzas" element={<PizzaList />} />
        <Route path="/create" element={<RestaurantPizzaForm />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/" element={<RestaurantList />} />
      </Routes>
    </div>
  );
}

export default App;
