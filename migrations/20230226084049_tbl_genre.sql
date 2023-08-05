-- migrate:up
CREATE TABLE tbl_genre(
    genre_id int(10) PRIMARY KEY AUTO_INCREMENT,
    genre_name varchar(25) NOT NULL,
    genre_status boolean DEFAULT 1
);

-- migrate:down
DROP TABLE tbl_genre;

