
DROP DATABASE IF EXISTS phoneDB;

CREATE DATABASE phoneDB;

USE phoneDB;

DROP TABLE IF EXISTS mobile_numbers;

CREATE TABLE mobile_numbers ( 
  id INT NOT NULL AUTO_INCREMENT, 
  name varchar(100) NOT NULL, 
  phone varchar(13) NOT NULL,
  PRIMARY KEY (id) 
);


INSERT INTO mobile_numbers (name, phone) VALUES("test", "0125871874");
INSERT INTO mobile_numbers (name, phone) VALUES("test 1", "012587841");
INSERT INTO mobile_numbers (name, phone) VALUES("test 1", "01923214589");