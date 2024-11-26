import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library Management API",
      version: "1.0.0",
      description: "API for managing library members and book borrowing/returning",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local server",
      },
    ],
  },
  apis: ["./routes/*.ts"], // Specify where API documentation is defined
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export default swaggerDocs;
