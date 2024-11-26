"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
                url: process.env.API_BASE_URL || "http://localhost:3000",
                description: process.env.NODE_ENV === "production" ? "Production server" : "Local server",
            },
        ],
    },
    apis: ["./routes/*.ts"],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.default = swaggerDocs;
//# sourceMappingURL=swaggerConfig.js.map