import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library Management API",
      version: "1.0.0",
      description: "API for managing library members and book borrowing/returning..",
    },
    servers: [
      {
        url: process.env.API_BASE_URL || "http://localhost:3000",
        description: process.env.NODE_ENV === "production" ? "Production server" : "Local server",
      },
    ],
  },
  apis: ["./routes/*.ts"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export default swaggerDocs;
