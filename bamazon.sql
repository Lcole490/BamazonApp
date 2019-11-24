DROP DATABASE IF EXISTS bamazon;

Create Database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    products_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    product_sales INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);


INSERT INTO products (item_id, products_name, department_name, price, stock_quantity, product_sales)
VALUES(101, "MacBook", "Electronics", 1275.99, 12, 0),
(102, "HP Laptop", "Electronics", 749.99, 7, 0 ), (103, "Iphone XXL", "Electronics", 1125, 5, 0),
(104, "Basketball", "Sports", 48.00, 10, 0), (105, "Sneakers", "Sports", 125.00, 15, 0),
(106, "Football", "Sports", 35.00, 5, 0), (107, "Vitamix", "Kitchen", 335.00, 9, 0),
(108, "Waffle Iron", "Kitchen", 22.99, 12, 0), (109, "Wireless Earbuds", "Electronics", 79.99, 15, 0 ),
(110, "Air Fryer", "Kitchen", 80.00, 9, 0), (111, "Baseball", "Sports", 10.00, 25, 0),
(112, "Book Bag", "Office", 45.00, 4, 0), (113, "Dry-Erase Marker", "Office", 2.75, 55, 0),
(114, "Rubber Duck", "Office", 1.50, 86, 0);



CREATE TABLE departments(
    department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    over_head_costs INTEGER(11) NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES(700, "Electronics", 10000),(701, "Office", 5000), (702, "Sports", 8000), (703, "Kitchen", 7000);

SELECT * FROM products;

SELECT * FROM departments;