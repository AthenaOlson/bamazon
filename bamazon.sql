DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
	item_id INTEGER AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	price FLOAT(8) NOT NULL,
	stock_quantity INTEGER NOT NULL,
	Cost FLOAT(8),
	PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Silicone Colendar", "accesories", 8.5, 44),
    ("Matryoshka Measuring Cups", "accessories", 5.25, 100),
    ("Linen Dish Towels, set of 3", "accessories", 21.79, 56),
    ("Instant Pot Pressure Cooker", "appliances", 85.99, 23),
    ("Jura Espresso Maker", "beverages", 600, 21),
    ("Porcelain Espresso Cups, set of 2", "beverages", 32.65, 89),
    ("Paring Knife", "accessories", 14.50, 36),
    ("Electric Tea Kettle", "appliances", 21.32, 59),
    ("Mixing Bowl Set", "accessories", 45.63, 78),
    ("Cuisinart Stand Mixer", "appliances", 230, 78),
    ("Spatula", "accessories", 7.50, 132);