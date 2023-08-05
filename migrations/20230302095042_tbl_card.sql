-- migrate:up
CREATE TABLE tbl_card(
    card_id int(10) PRIMARY KEY AUTO_INCREMENT,
    artist_id int(10),
    card_name varchar(25) not null,
    card_number varchar(16) not null,
    card_expiry date not null,
    FOREIGN KEY (artist_id) REFERENCES tbl_artist(artist_id)
);

-- migrate:down
DROP TABLE tbl_card;

