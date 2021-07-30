DROP DATABASE tracker3000

CREATE DATABASE tracker3000

USE tracker3000

CREATE TABLE portfolios (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    creates_at DATETIME NOT NULL,
);

CREATE TABLE tickers (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    ticker VARCHAR(255) NOT NULL,
    num_shares INTEGER NOT NULL,
    price_paid FLOAT NOT NULL,
    portfolio_id INTEGER NOT NULL,
    date_purchased DATETIME NOT NULL,
    FOREIGN KEY (portfolio_id) REFERENCES portfolios(id
);