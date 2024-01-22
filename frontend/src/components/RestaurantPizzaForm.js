// src/components/RestaurantPizzaForm.js
import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const RestaurantPizzaForm = ({ restaurantId }) => {
  const [price, setPrice] = useState(0);
  const [pizzaId, setPizzaId] = useState('');
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get('/pizzas');
        setPizzas(response.data);
      } catch (error) {
        console.error('Error fetching pizzas:', error);
      }
    };

    fetchPizzas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/restaurant_pizzas', { price, pizza_id: pizzaId, restaurant_id: restaurantId });
      // Handle success, maybe update state or show a message
      console.log('RestaurantPizza created successfully!');
    } catch (error) {
      console.error('Error creating RestaurantPizza:', error);
      // Handle error, show an error message
    }
  };

  return (
    <div>
      <h2>Create Restaurant Pizza</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label>
          Pizza:
          <select value={pizzaId} onChange={(e) => setPizzaId(e.target.value)}>
            <option value="" disabled>
              Select Pizza
            </option>
            {pizzas.map((pizza) => (
              <option key={pizza.id} value={pizza.id}>
                {pizza.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default RestaurantPizzaForm;
