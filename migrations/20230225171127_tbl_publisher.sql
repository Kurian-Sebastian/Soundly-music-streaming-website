-- migrate:up
CREATE TABLE tbl_publisher(
    publisher_id int(10) PRIMARY KEY AUTO_INCREMENT,
    email varchar(25),
    publisher_name varchar(25) NOT NULL,
    publisher_phone varchar(10) NOT NULL,
    date_added DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (email) REFERENCES tbl_login(email)
);


-- migrate:down
DROP TABLE tbl_publisher;
