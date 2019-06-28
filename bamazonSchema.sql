DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,  department_name, price, stock_quantity)
VALUES 
    ("Legend of Zelda: BOTW", "Video Games", 19.99, 70),
    ("Barbell Weight Set", "Gym Equipment", 200.00, 50),
    ("RGB LED Strip", "Computer Hardware", 30.50, 125),
    ("Kingdom Hearts 3", "Video Games", 29.99, 100),
    ("Wrist Wraps", "Gym Equipment", 25.00, 100),
    ("Mordhau", "Video Games", 29.99, 200),
    ("Madden NFL 2020", "Video Games", 59.99, 100),
    ("Cyberpunk 2077", "Video Games", 49.99, 200),
    ("GTX 1080 Ti", "Computer Hardware", 400.00, 75),
    ("16 GB RAM Stick", "Computer Hardware", 75.05, 150);

