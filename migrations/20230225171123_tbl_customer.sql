-- migrate:up
CREATE TABLE tbl_customer(
    customer_id int(10) PRIMARY KEY AUTO_INCREMENT,
    email varchar(25),
    customer_name varchar(25) NOT NULL,
    customer_phone numeric(10) not null,
    date_added DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (email) REFERENCES tbl_login(email)
);

-- migrate:down
DROP TABLE tbl_customer;
