# seed.py
from app import app, db
from models import Restaurant, Pizza, RestaurantPizza

# Initialize SQLAlchemy with your Flask app
db.init_app(app)

# Create tables
with app.app_context():
    db.create_all()

# Seed data
with app.app_context():
    # Add restaurants
    restaurant1 = Restaurant(name='Restaurant A', address='123 Main St')
    restaurant2 = Restaurant(name='Restaurant B', address='456 Oak St')
    db.session.add_all([restaurant1, restaurant2])
    db.session.commit()

    # Add pizzas
    pizza1 = Pizza(name='Margherita', ingredients='Tomato, Mozzarella, Basil')
    pizza2 = Pizza(name='Pepperoni', ingredients='Pepperoni, Cheese, Tomato Sauce')
    db.session.add_all([pizza1, pizza2])
    db.session.commit()

    # Add restaurant pizzas
    rp1 = RestaurantPizza(restaurant_id=restaurant1.id, pizza_id=pizza1.id, price=12.99)
    rp2 = RestaurantPizza(restaurant_id=restaurant2.id, pizza_id=pizza2.id, price=14.99)
    db.session.add_all([rp1, rp2])
    db.session.commit()

print("Database seeded successfully!")
