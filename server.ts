import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/config";
import libraryRoutes from "./routes/library";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./config/swaggerConfig";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/", libraryRoutes);

sequelize.sync().then(() => {
  console.log("Database connected");
  console.log("Swagger documentation available at /api-docs");
  app.listen(process.env.PORT || 3000, () => console.log("Server running"));
});
