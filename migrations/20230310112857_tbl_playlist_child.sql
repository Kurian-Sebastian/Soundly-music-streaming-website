-- migrate:up
CREATE TABLE tbl_playlist_child(
    playlist_child_id int(10) PRIMARY KEY AUTO_INCREMENT,
    playlist_master_id int(10),
    music_id int(10),
    date_added DATETIME not null DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (playlist_master_id) REFERENCES tbl_playlist_master(playlist_master_id),
    FOREIGN KEY (music_id) REFERENCES tbl_music(music_id),
    UNIQUE (music_id, playlist_master_id)
);

-- migrate:down
DROP TABLE tbl_playlist_child;
