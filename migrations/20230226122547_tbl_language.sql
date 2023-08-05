-- migrate:up
CREATE TABLE tbl_language(
    language_id int(10) PRIMARY KEY AUTO_INCREMENT,
    language_name varchar(25) NOT NULL,
    language_status boolean DEFAULT 1
    );

-- migrate:down
DROP TABLE tbl_language;
