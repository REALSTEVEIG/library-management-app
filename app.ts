import express from "express";
import dotenv from "dotenv";
import libraryRoutes from "./routes/library";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./config/swaggerConfig";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/", libraryRoutes);

export default app;
