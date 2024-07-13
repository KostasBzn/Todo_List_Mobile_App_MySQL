import express from "express";
import "dotenv/config";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import { createTables } from "./scripts/createTables.js";

const port = process.env.PORT;
const clientURL = process.env.CLIENT_URL;

const app = express();

app.use(express.json());

const corsOptions = {
  origin: clientURL,
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);
createTables();
app.listen(port, () => {
  console.log(`The server is running in port ${port}`);
});
