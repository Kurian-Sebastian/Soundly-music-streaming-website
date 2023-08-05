-- migrate:up
CREATE TABLE tbl_artist(
    artist_id int(10) PRIMARY KEY AUTO_INCREMENT,
    email varchar(25),
    artist_name varchar(25) NOT NULL,
    artist_phone numeric(10) not null,
    date_added DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    artist_image mediumblob not null,
    FOREIGN KEY (email) REFERENCES tbl_login(email)
);

-- migrate:down
DROP TABLE tbl_artist;
