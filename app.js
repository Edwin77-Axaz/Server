import express from 'express';
import {
    getTodo,
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
    const todos = await getTodoByID(req.params.id);
    res.status(200).send(todos);
});


app.get("/todos/shared_todos/:id",async (req, res) => {
    const todos = await getSharedTodoByID(req,params.id);
    const author = await getUserByID(todos.user_id);
    const shared_with = await getUserByID(todos.shared_with_id);
    res.status(200).send({author, shared_with});
});


app.get("/users/:id", async (req, res) => {
    const user = await getUserByID(req.params.id);
    res.status(200).send(user);
});

app.put("/todos/:id", async (req, res) => {
    const {value} = req.body;
    const todos = await toogleCompleted(req.params.id, value);
    res.status(200).send(todos); 
});

app.delete("/todos/:id", async (req, res) => {
    await deleteTodo(req.params.id);
    res.send({message : "Todo deleted successfully"});
});


app.post("/todos/shared_todos", async (req, res) => {
    const {todos_id, user_id, email} = req.body;
    //const {todo:id, user_id , shared-witj_id} = req.body;
    const userToShare = await getUserByEmail(email);
    const sharedTodos = await sharedTodos(todos_id, user_id, userToShare.id);
    res.status(201).send(shareTodos)
});


app.post("/todos", async (req, res) =>{
    const {user_id, title} = req.body;
    const todos = await createTodo(user_id, title);
    res.status(201).send(todos);

});




app.listen(3000, () => {
    console.log("Server running on port 3000")
})