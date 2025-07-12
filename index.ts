import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import AuthController from "./controllers/auth.controller";
import { validateLogin, validateRegister } from "./validators/auth.validator";
import connectToDB from "./config/database";
import TodosController from "./controllers/todos.controller";
import { authenticateRequest } from "./middlewares/validate";
import "./cronjobs/index";
import {
  validateCreateTodo,
  validateDeleteTodo,
  validateFetchTodos,
  validateUpdateTodo,
} from "./validators/todos.validator";

const app = express();

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication Routes
app.post("/api/login", validateLogin, AuthController.login);
app.post("/api/register", validateRegister, AuthController.register);

// Todo Routes
app.get(
  "/api/todos/:userId",
  validateFetchTodos,
  authenticateRequest,
  TodosController.getTodos
);
app.post(
  "/api/todo/:userId",
  validateCreateTodo,
  authenticateRequest,
  TodosController.createTodo
);
app.patch(
  "/api/todo/:todoId",
  validateUpdateTodo,
  authenticateRequest,
  TodosController.updateTodo
);
app.delete(
  "/api/todo/:todoId",
  validateDeleteTodo,
  authenticateRequest,
  TodosController.deleteTodo
);

app.listen(4000, () => {
  console.log("🚀 Server is running on port 4000");
});
