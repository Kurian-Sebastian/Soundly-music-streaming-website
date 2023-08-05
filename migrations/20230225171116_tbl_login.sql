-- migrate:up
create table tbl_login (
    email varchar(25) PRIMARY KEY,
    password varchar(25) not null,
    type  varchar(10) not null,
    status boolean default 1
);
INSERT INTO tbl_login (
    email,password,type
) VALUES ( 
    "admin@soundly.co.in",
    "admin",
    "admin"
);

-- migrate:down
DROP TABLE tbl_login;
