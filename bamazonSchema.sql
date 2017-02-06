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

