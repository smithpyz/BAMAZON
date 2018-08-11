DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE productsDB
(
  item_id INT(12) NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  PRIMARY KEY(item_id)
);

INSERT INTO productsDB(item_id, product_name, department_name, price, stock_quantity)
VALUES
  (1, 'cheetah_on_stick', 'fishing rod toys', 10.99, 23),
  (2, 'feather on stick', 'fishing_rod_toys', 0.99, 2),
  (3, 'froggie', 'plush toys', 45.99, 14),
  (4, 'cat_fortune_cookie', 'plush toys', 12.5, 76),
  (5, 'disney_princess_ mouse', 'plush toys', 0.01, 11),
  (6, 'wobbling_lobstah', 'plush toys', 5.69, 33),
  (7, 'KONG for cat', 'training toys', 6.99, 4),
  (8, 'cat_harness', 'training toys', 56.76, 7),
  (9, 'cat gogurt', 'treats', 3.49, 56),
  (10, 'cat_twizzler', 'treats', 3.12, 1),
  (11, 'kitten_health_nibs', 'treats', 5.43, 24),
  (12, 'alisons_shoes', 'treats', 100.01, 1)

SELECT * FROM productsDB;