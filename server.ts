import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import { PORT } from "./src/config/env";
import router from "./src/routes";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    allowedHeaders: "*",
    methods: "*",
  })
);

app.use(router);
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
