-- migrate:up
CREATE TABLE tbl_playlist_master(
    playlist_master_id int(10) PRIMARY KEY AUTO_INCREMENT,
    email varchar(25),
    playlist_name varchar(20) not null,
    playlist_status boolean not null default 1,
    FOREIGN KEY (email) REFERENCES tbl_login(email)
);

-- migrate:down
DROP TABLE tbl_playlist_master;

