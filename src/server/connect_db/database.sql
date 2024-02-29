-- Схема пользователя 
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_activated BOOLEAN DEFAULT false,
    activation_link VARCHAR(255)
);
-- Cхема для хранения Refresh токена(ссылается на пользователя)
CREATE TABLE token (
    id SERIAL PRIMARY KEY,
    refresh_token VARCHAR(255) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    
);