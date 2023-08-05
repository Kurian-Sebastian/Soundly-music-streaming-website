-- migrate:up
CREATE TABLE tbl_music(
    music_id int(10) PRIMARY KEY AUTO_INCREMENT,
    publisher_id int(10) NOT NULL,
    artist_id int(10) NOT NULL,
    genre_id int(10) not null,
    language_id int(10) not null,
    music_name varchar(25) not null,
    music_status varchar(10) not null,
    music_image mediumblob not null,
    music_price int(10) default 0,
    music_file mediumblob not null,
    date_added DATETIME not null DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (publisher_id) REFERENCES tbl_publisher(publisher_id),
    FOREIGN KEY (genre_id) REFERENCES tbl_genre(genre_id),
    FOREIGN KEY (artist_id) REFERENCES tbl_artist(artist_id),
    FOREIGN KEY (language_id) REFERENCES tbl_language(language_id)
);

-- migrate:down
DROP TABLE tbl_music;

