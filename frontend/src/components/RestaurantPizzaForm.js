// frontend/src/components/RestaurantPizzaForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantPizzaForm = () => {
  const [formData, setFormData] = useState({
    price: '',
    pizza_id: '',
    restaurant_id: '',
  });

  const [pizzas, setPizzas] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetch pizzas and restaurants for dropdowns
    axios.get('/pizzas')
      .then(response => setPizzas(response.data))
      .catch(error => console.error('Error fetching pizzas:', error));

    axios.get('/restaurants')
      .then(response => setRestaurants(response.data))
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/restaurant_pizzas', formData)
      .then(response => console.log('RestaurantPizza created successfully:', response.data))
      .catch(error => console.error('Error creating RestaurantPizza:', error));
  };

  return (
    <div>
      <h1>Create Restaurant Pizza</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
        </label>
        <label>
          Pizza:
          <select name="pizza_id" value={formData.pizza_id} onChange={handleInputChange}>
            <option value="">Select Pizza</option>
            {pizzas.map(pizza => (
              <option key={pizza.id} value={pizza.id}>{pizza.name}</option>
            ))}
          </select>
        </label>
        <label>
          Restaurant:
          <select name="restaurant_id" value={formData.restaurant_id} onChange={handleInputChange}>
            <option value="">Select Restaurant</option>
            {restaurants.map(restaurant => (
              <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>
            ))}
          </select>
        </label>
        <button type="submit">Create Restaurant Pizza</button>
      </form>
    </div>
  );
};

export default RestaurantPizzaForm;
