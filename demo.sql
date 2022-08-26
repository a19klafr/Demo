DROP DATABASE IF EXISTS demo;
CREATE DATABASE IF NOT EXISTS demo;
USE demo;

CREATE TABLE products(
	productName VARCHAR(30) NOT NULL,
    price INTEGER NOT NULL,
    image VARCHAR(100),
    PRIMARY KEY (productName)
)ENGINE=INNODB;

CREATE TABLE categories(
	categoryName VARCHAR(15) NOT NULL,
    PRIMARY KEY (categoryName)
)ENGINE=INNODB;

CREATE TABLE productcategory(
	product VARCHAR(30) NOT NULL,
    category VARCHAR(15) NOT NULL,
    PRIMARY KEY (product, category),
    FOREIGN KEY (product) REFERENCES products(productName),
    FOREIGN KEY (category) REFERENCES categories(categoryName)
)ENGINE=INNODB;

INSERT INTO products(productName, price) VALUES ("Small Tent", 400.00);
INSERT INTO products(productName, price) VALUES ("Medium Tent", 600.00);
INSERT INTO products(productName, price) VALUES ("Large Tent", 1000.00);
INSERT INTO products(productName, price) VALUES ("Party Tent", 4000.00);
INSERT INTO products(productName, price) VALUES ("Firebasket", 500.00);

INSERT INTO categories(categoryName) VALUES ("Black");
INSERT INTO categories(categoryName) VALUES ("White");
INSERT INTO categories(categoryName) VALUES ("Blue");
INSERT INTO categories(categoryName) VALUES ("Grey");
INSERT INTO categories(categoryName) VALUES ("Green");
INSERT INTO categories(categoryName) VALUES ("Red");

INSERT INTO productcategory(product, category) VALUES ("Small Tent", "Black");
INSERT INTO productcategory(product, category) VALUES ("Small Tent", "Red");
INSERT INTO productcategory(product, category) VALUES ("Small Tent", "Grey");
INSERT INTO productcategory(product, category) VALUES ("Large Tent", "Black");
INSERT INTO productcategory(product, category) VALUES ("Large Tent", "Blue");
INSERT INTO productcategory(product, category) VALUES ("Firebasket", "Black");
INSERT INTO productcategory(product, category) VALUES ("Party Tent", "White");
