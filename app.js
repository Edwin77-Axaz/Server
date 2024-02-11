import express from 'express';
import {
    getTodo,
    getAllTodosShard,
    getAllTodos,
    shareTodos,
    deleteTodo,
    getTodoByID,
    createTodo,
    toogleCompleted,
    getUserByEmail,
    getUserByID,
    getSharedTodoByID,  
} from "./database.js";
import cors from "cors";


const corsOptions = {
    origin: ["http://192.168.0.22:8081", "http://localhost:8081", "exp://192.168.0.22:8081", "https://azrael.onrender.com"],
    methods: ["POST", "GET"],
    credentials: true 
 };


const app = express();

app.use(express.json());
app.use(cors(corsOptions));



// Ruta principal
app.get("/", (req, res) => {
    res.send("¡Hola Mundo!");
});

app.get("/todos/:id", async (req, res) => {
    try {
        const todos = await getTodoByID(req.params.id);
        res.status(200).send(todos);
    } catch (error) {
        console.error('Error al obtener todos por ID:', error);
        res.status(500).send({ error: 'Error al obtener todos por ID' });
    }
});

app.get("/todos/shared_todos/:id", async (req, res) => {
    try {
        const todos = await getSharedTodoByID(req.params.id);
        const author = await getUserByID(todos.user_id);
        const shared_with = await getUserByID(todos.shared_with_id);
        res.status(200).send({ author, shared_with });
    } catch (error) {
        console.error('Error al obtener todos compartidos por ID:', error);
        res.status(500).send({ error: 'Error al obtener todos compartidos por ID' });
    }
});

app.get("/users/:id", async (req, res) => {
    try {
        const user = await getUserByID(req.params.id);
        res.status(200).send(user);
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).send({ error: 'Error al obtener usuario por ID' });
    }
});

app.put("/todos/:id", async (req, res) => {
    try {
        const { value } = req.body;
        const todos = await toogleCompleted(req.params.id, value);
        res.status(200).send(todos);
    } catch (error) {
        console.error('Error al cambiar el estado de completado del todo:', error);
        res.status(500).send({ error: 'Error al cambiar el estado de completado del todo' });
    }
});

app.delete("/todos/:id", async (req, res) => {
    try {
        await deleteTodo(req.params.id);
        res.send({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error('Error al eliminar todo:', error);
        res.status(500).send({ error: 'Error al eliminar todo' });
    }
});

app.post("/todos/shared_todos", async (req, res) => {
    try {
        const { todos_id, user_id, email } = req.body;
        const userToShare = await getUserByEmail(email);
        const sharedTodos = await shareTodos(todos_id, user_id, userToShare.id);
        res.status(201).send(sharedTodos);
    } catch (error) {
        console.error('Error al compartir todo:', error);
        res.status(500).send({ error: 'Error al compartir todo' });
    }
});



// Obtener todos los todos
app.get("/todos", async (req, res) => {
    try {
        const todos = await getAllTodos();
        res.status(200).send(todos);
    } catch (error) {
        console.error('Error al obtener todos los todos:', error);
        res.status(500).send({ error: 'Error al obtener todos los todos' });
    }
});



app.post("/todos", async (req, res) => {
    try {
        const { user_id, title } = req.body;
        const todos = await createTodo(user_id, title);
        res.status(201).send(todos);
    } catch (error) {
        console.error('Error al crear todo:', error);
        res.status(500).send({ error: 'Error al crear todo' });
    }
});




app.get("/todoshared", async (req, res) => {
    try {
        const todos = await getAllTodosShard();
        res.status(200).send(todos);
    } catch (error) {
        console.error('Error al obtener todos los todos compartidos:', error);
        res.status(500).send({ error: 'Error al obtener todos los todos compartidos' });
    }
});



app.listen(3000, () => {
    console.log("Server running on port 3000")
})