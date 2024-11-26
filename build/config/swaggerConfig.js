"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
                url: "http://localhost:3000",
                description: "Local server",
            },
        ],
    },
    apis: ["./routes/*.ts"],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.default = swaggerDocs;
//# sourceMappingURL=swaggerConfig.js.map