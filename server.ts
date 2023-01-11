import express from "express";
import cors from "cors";
import { PORT } from "./src/config/env";
import router from "./src/routes";
import swaggerUi from "swagger-ui-express";
import swaggerJSON from './swagger.json';
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    allowedHeaders: "*",
    methods: "*",
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSON));
app.use(router);
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
