// frontend/src/components/RestaurantDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantDetail = ({ match }) => {
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    axios.get(`/restaurants/${match.params.id}`)
      .then(response => setRestaurant(response.data))
      .catch(error => console.error('Error fetching restaurant details:', error));
  }, [match.params.id]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{restaurant.name}</h2>
      <p>Address: {restaurant.address}</p>
      <h3>Pizzas:</h3>
      <ul>
        {restaurant.pizzas.map(pizza => (
          <li key={pizza.id}>
            {pizza.name} - {pizza.ingredients}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantDetail;
