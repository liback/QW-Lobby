drop database if exists qwlobby;

create database if not exists qwlobby;

use qwlobby;

drop table if exists users;

create table if not exists users(
    id integer primary key auto_increment,
    username varchar(100) unique,
    password varchar(100)
)engine=innodb;
