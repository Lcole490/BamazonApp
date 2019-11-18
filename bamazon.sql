Create Database bamazon

CREATE TABLE "products" (
    "item_id" int(11) NOT NULL AUTO_INCREMENT,
    "products_name" varchar(30) NOT NULL,
    "department_name" varchar(30) NOT NULL,
    "price" decimal(10,2) NOT NULL,
    "stock_quantity" int(11) NOT NULL,
);


INSERT INTO "products" VALUES(1, MacBook, Electronics, 1275.99, 12),
(2, HP Laptop, Electronics, 749.99, 7 ), (3, IphoneXXL, Electronics, 1125, 5),
(4, Basketball, Sports, 48.00, 10), (5, Sneakers, Sports, 125.00, 15),
(6, Football, Sports, 35.00, 5), (7, Vitamix, Kitchen, 335.00, 9),
(8, Waffle Iron, Kitchen, 22.99, 12), (9, Wireless Earbuds, Electronics, 79.99, 15 ),
(10, Air Fryer, Kitchen, 80.00, 9), (11, Baseball, Sports, 10.00, 25),
(12, Book Bag, Office, 45.00, 4), (13, Dry-Erase Marker, Office, 2.75, 55),
(14, Rubber Duck, Office, 1.50, 86);