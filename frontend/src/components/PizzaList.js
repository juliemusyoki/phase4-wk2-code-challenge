// frontend/src/components/PizzaList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    axios.get('/pizzas')
      .then(response => setPizzas(response.data))
      .catch(error => console.error('Error fetching pizzas:', error));
  }, []);

  return (
    <div>
      <h1>Pizza List</h1>
      <ul>
        {pizzas.map(pizza => (
          <li key={pizza.id}>
            <strong>{pizza.name}</strong> - {pizza.ingredients}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PizzaList;
