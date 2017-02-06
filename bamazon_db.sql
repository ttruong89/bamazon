CREATE DATABASE IF NOT EXISTS Bamazon;

USE Bamazon;

CREATE TABLE IF NOT EXISTS products (
	item_id INT(11) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(45),
    price DECIMAL(5,2) NOT NULL,
    stock_quantity INT(10) UNSIGNED NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES 
	(1, 'HP Wireless Mouse', 'Computers', 9.99, 100),
    (2, 'Neutrogena Acne Cream', 'Beauty', 4.99, 200),
    (3, 'CAT Toy Truck', 'Toys', 7.99, 100),
    (4, 'Dom Perignon Champagne', 'Wine', 195.00, 25),
    (5, 'Bosch Windshield Wipers', 'Automotives', 50.50, 100),
    (6, 'Microsoft Office Home', 'Software', 115.99, 200),
    (7, 'TMS Acoustic Violin', 'Musical Instruments', 40.95, 100),
    (8, 'Playstation Game Console', 'Video Games', 182.50, 50),
    (9, 'Lyork Vibrator', 'Sex Toys', 19.50, 50),
    (10, 'Bose Soundlink', 'Computer', 185.90, 100);