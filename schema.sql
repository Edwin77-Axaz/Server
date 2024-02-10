CREATE DATABASE tareas;

USE tareas;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)UNIQUE NOT NULL ,
    password VARCHAR(255)
);


CREATE TABLE todos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    completed BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE shared_todos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    todos_id INT ,
    user_id INT ,
    shared_with_id INT,
    FOREIGN KEY(todos_id) REFERENCES todos(id)ON DELETE CASCADE ,
    FOREIGN KEY(user_id) REFERENCES users(id)ON DELETE CASCADE,
    FOREIGN KEY(shared_with_id) REFERENCES users(id)ON DELETE CASCADE
);


INSERT INTO users (name, email, password) VALUES ('Sato', 'user1@example.com', 'password1');
INSERT INTO users (name, email, password) VALUES ('Kaneki', 'user2@example.com', 'password2');


SELECT * FROM users where id = 1;

INSERT INTO todos (title, user_id)
VALUES
("Ir a correr por la mañana 🏃‍♂️", 1),
("Trabajar en la presentación del proyecto 💼", 1),
("Ir de compras al supermercado 🛒", 1),
("Leer 30 páginas del libro 📚", 1),
("Montar en bicicleta al parque 🚴‍♀️", 1),
("Cocinar la cena para la familia 👩‍🍳", 1),
("Practicar yoga 🧘‍♀️", 1),
("Escuchar un podcast 🎧", 1),
("Limpiar la casa 🧹", 1),
("Dormir 8 horas 😴", 1);


SELECT * FROM todos;

SELECT * FROM todos where user_id = 1 ;


DESC shared_todos;


INSERT INTO shared_todos (todos_id, user_id, shared_with_id)
VALUES (1,1,2)

SELECT todos. *, shared_todos.shared_with_id
from todos
LEFT JOIN shared_todos ON todos.id = shared_todos.todos_id
WHERE todos.user_id = 2 OR shared_todos.shared_with_id = 2;