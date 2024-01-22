// frontend/src/components/RestaurantList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get('/restaurants')
      .then(response => setRestaurants(response.data))
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  return (
    <div>
      <h1>Pizza Restaurants</h1>
      <ul>
        {restaurants.map(restaurant => (
          <li key={restaurant.id}>
            <Link to={`/restaurants/${restaurant.id}`}>
              <strong>{restaurant.name}</strong> - {restaurant.address}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
