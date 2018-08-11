DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE productsDB
(
  item_id INT(12) NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  department_id INT(12) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  overhead_costs DECIMAL(10,2) NOT NULL,
  total_sales DECIMAL(10,2) NOT NULL,
  PRIMARY KEY(item_id)
);

INSERT INTO productsDB
  (item_id, product_name, department_name, department_id, price, stock_quantity, overhead_costs, total_sales)
VALUES
  (1, 'cheetah_on_stick', 'fishing rod toys', 1, 10.99, 23, 252.77, ''),
  (2, 'feather on stick', 'fishing_rod_toys', 1, 0.99, 2, 1.98, ''),
  (3, 'froggie', 'plush toys', 2, 45.99, 14, 643.86, ''),
  (4, 'cat_fortune_cookie', 'plush toys', 2, 12.5, 76, 950, ''),
  (5, 'disney_princess_ mouse', 'plush toys', 2, 0.01, 11, 0.11, ''),
  (6, 'wobbling_lobstah', 'plush toys', 2, 5.69, 33, 187.77, ''),
  (7, 'KONG for cat', 'training toys', 3, 6.99, 4, 27.96, ''),
  (8, 'cat_harness', 'training toys', 3, 56.76, 7, 397.32, ''),
  (9, 'cat gogurt', 'treats', 4, 3.49, 56, 195.44, ''),
  (10, 'cat_twizzler', 'treats', 4, 3.12, 1, 3.12, ''),
  (11, 'kitten_health_nibs', 'treats', 4, 5.43, 24, 130.32, ''),
  (12, 'alisons_shoes', 'treats', 4, 100.01, 1, 100.01, '')

SELECT * FROM productsDB;
