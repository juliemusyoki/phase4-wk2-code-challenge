# app.py
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db, Restaurant, Pizza, RestaurantPizza

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pizzarestaurant.db'
db.init_app(app)  # Initialize SQLAlchemy with your Flask app

# Create tables
with app.app_context():
    db.create_all()

# Add a route for the root URL
@app.route('/')
def index():
    return jsonify({'message': 'Welcome to the Pizza Restaurant API'})

@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.all()
    return jsonify([{'id': restaurant.id, 'name': restaurant.name, 'address': restaurant.address} for restaurant in restaurants])

@app.route('/restaurants/<int:restaurant_id>', methods=['GET'])
def get_restaurant(restaurant_id):
    restaurant = Restaurant.query.get_or_404(restaurant_id)
    pizzas = [{'id': pizza.id, 'name': pizza.name, 'ingredients': pizza.ingredients} for pizza in restaurant.pizzas]
    return jsonify({'id': restaurant.id, 'name': restaurant.name, 'address': restaurant.address, 'pizzas': pizzas})

@app.route('/restaurants/<int:restaurant_id>', methods=['DELETE'])
def delete_restaurant(restaurant_id):
    restaurant = Restaurant.query.get_or_404(restaurant_id)
    
    # Delete associated RestaurantPizzas
    RestaurantPizza.query.filter_by(restaurant_id=restaurant.id).delete()

    # Delete the restaurant
    db.session.delete(restaurant)
    db.session.commit()

    return jsonify({'message': 'Restaurant deleted successfully'})

@app.route('/pizzas', methods=['GET'])
def get_pizzas():
    pizzas = Pizza.query.all()
    return jsonify([{'id': pizza.id, 'name': pizza.name, 'ingredients': pizza.ingredients} for pizza in pizzas])

@app.route('/restaurant_pizzas', methods=['POST'])
def create_restaurant_pizza():
    data = request.get_json()

    restaurant_id = data.get('restaurant_id')
    pizza_id = data.get('pizza_id')
    price = data.get('price')

    # Check if the restaurant and pizza exist
    restaurant = Restaurant.query.get_or_404(restaurant_id)
    pizza = Pizza.query.get_or_404(pizza_id)

    # Create a new RestaurantPizza
    restaurant_pizza = RestaurantPizza(restaurant_id=restaurant.id, pizza_id=pizza.id, price=price)
    db.session.add(restaurant_pizza)
    db.session.commit()

    return jsonify({'message': 'RestaurantPizza created successfully'})

if __name__ == '__main__':
    app.run(debug=True)
