CREATE TABLE users(
  username VARCHAR(32) NOT NULL PRIMARY KEY,
  token CHAR(64) NOT NULL  -- all tokens are of fixed length - 64 chars
);
