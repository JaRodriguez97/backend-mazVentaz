import express from "express";
import messageRoutes from "./routes/messageRoutes.js";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware para parsear JSON

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(cors());
app.use(morgan("dev"));

app.use("/apiWhatAuto/message", messageRoutes); // Ruta principal

app.set("port", PORT);

export default app;
