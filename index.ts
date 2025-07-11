import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import AuthController from "./controllers/auth.controller";
import { validateLogin, validateRegister } from "./validators/auth.validator";
import connectToDB from "./config/database";

const app = express();

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication Routes
app.post("/api/login", validateLogin, AuthController.login);
app.post("/api/register", validateRegister, AuthController.register);

app.listen(4000, () => {
  console.log("🚀 Server is running on port 4000");
});
