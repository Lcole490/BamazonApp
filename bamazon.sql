DROP DATABASE IF EXISTS bamazon;

Create Database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    products_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);


INSERT INTO products (item_id, products_name, department_name, price, stock_quantity)
VALUES(101, "MacBook", "Electronics", 1275.99, 12),
(102, "HP Laptop", "Electronics", 749.99, 7 ), (103, "Iphone XXL", "Electronics", 1125, 5),
(104, "Basketball", "Sports", 48.00, 10), (105, "Sneakers", "Sports", 125.00, 15),
(106, "Football", "Sports", 35.00, 5), (107, "Vitamix", "Kitchen", 335.00, 9),
(108, "Waffle Iron", "Kitchen", 22.99, 12), (109, "Wireless Earbuds", "Electronics", 79.99, 15 ),
(110, "Air Fryer", "Kitchen", 80.00, 9), (111, "Baseball", "Sports", 10.00, 25),
(112, "Book Bag", "Office", 45.00, 4), (113, "Dry-Erase Marker", "Office", 2.75, 55),
(114, "Rubber Duck", "Office", 1.50, 86);


SELECT * FROM products;