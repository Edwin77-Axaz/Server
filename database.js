import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql
    .createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,   
        port    : process.env.MYSQL_PORT,
    })
    .promise();


    export async function getTodoByID(id) {
        try {
            const [rows] = await pool.query(
                `SELECT todos.*, shared_todos.shared_with_id
                FROM todos
                LEFT JOIN shared_todos ON todos.id = shared_todos.todos_id
                WHERE todos.user_id = ? OR shared_todos.shared_with_id = ?;`,
                [id, id]
            );
            return rows;
        } catch (error) {
            console.error('Error al obtener todo por ID:', error);
            throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama a la función
        }
    }
    
    export async function getTodo(id) {
        try {
            const [rows] = await pool.query(
                `SELECT * FROM shared_todos WHERE id = ?`,
                [id]
            );
            return rows[0];
        } catch (error) {
            console.error('Error al obtener todo por ID:', error);
            throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama a la función
        }
    }
    
    export async function getSharedTodoByID(id) {
        try {
            const [rows] = await pool.query(
                `SELECT * FROM shared_todos WHERE todos_id = ?`,
                [id]
            );
            return rows[0];
        } catch (error) {
            console.error('Error al obtener todo compartido por ID:', error);
            throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama a la función
        }
    }
    
    export async function getUserByID(id) {
        try {
            const [rows] = await pool.query(
                `SELECT * FROM users WHERE id = ?`,
                [id]
            );
            return rows[0];
        } catch (error) {
            console.error('Error al obtener usuario por ID:', error);
            throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama a la función
        }
    }
    
    export async function getUserByEmail(email) {
        try {
            const [rows] = await pool.query(
                `SELECT * FROM users WHERE email = ?`,
                [email]
            );
            return rows[0];
        } catch (error) {
            console.error('Error al obtener usuario por email:', error);
            throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama a la función
        }
    }
    
    export async function createTodo(user_id, title) {
        try {
            const [result] = await pool.query(
                `INSERT INTO todos (user_id, title) VALUES (?, ?)`,
                [user_id, title]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error al crear todo:', error);
            throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama a la función
        }
    }
    
    export async function deleteTodo(id) {
        try {
            const [result] = await pool.query(
                `DELETE FROM todos WHERE id = ?`,
                [id]
            );
            return result;
        } catch (error) {
            console.error('Error al eliminar todo:', error);
            throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama a la función
        }
    }
    
    export async function toogleCompleted(id, value) {
        try {
            const newValue = value === true ? "TRUE" : "FALSE";
            const [result] = await pool.query(
                `UPDATE todos SET completed = ${newValue} WHERE id = ?`,
                [id]
            );
            return result;
        } catch (error) {
            console.error('Error al cambiar el estado de completado del todo:', error);
            throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama a la función
        }
    }
    
    export async function shareTodos(todos_id, user_id, shared_with_id) {
        try {
            const [result] = await pool.query(
                `INSERT INTO shared_todos (todos_id, user_id, shared_with_id) VALUES (?, ?, ?)`,
                [todos_id, user_id, shared_with_id]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error al compartir todo:', error);
            throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama a la función
        }
    }

    export async function getAllTodos() {
        try {
            const [rows] = await pool.query(
                `SELECT * FROM todos`
            );
            return rows;
        } catch (error) {
            console.error('Error al obtener todos los todos:', error);
            throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama a la función
        }
    }



    export async function getAllTodosShard() {
        try {
            const [rows] = await pool.query(
                `SELECT todos.*, shared_todos.shared_with_id
                FROM todos
                LEFT JOIN shared_todos ON todos.id = shared_todos.todos_id
                WHERE todos.user_id = ? OR shared_todos.shared_with_id = ?`,
                [2, 2] // Aquí reemplaza 2 con el ID deseado
            );
            return rows;
        } catch (error) {
            console.error('Error al obtener todos los todos:', error);
            throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llama a la función
        }
    }