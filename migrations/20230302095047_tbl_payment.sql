-- migrate:up
CREATE TABLE tbl_payment(
    payment_id int(10) PRIMARY KEY AUTO_INCREMENT,
    card_id int(10),
    music_id int(10),
    FOREIGN KEY (music_id) REFERENCES tbl_music(music_id)
);

-- migrate:down
DROP TABLE tbl_payment;

