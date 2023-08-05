-- migrate:up
CREATE TABLE tbl_follower(
    follower_id int(10) PRIMARY KEY AUTO_INCREMENT,
    email varchar(25),
    artist_id int(10),
    follow_status boolean default 1,
    FOREIGN KEY (email) REFERENCES tbl_login(email),
    FOREIGN KEY (artist_id) REFERENCES tbl_artist(artist_id),
    UNIQUE(artist_id,email)
);

-- migrate:down
DROP TABLE tbl_follower;
