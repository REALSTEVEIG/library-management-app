"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./config/config"));
const library_1 = __importDefault(require("./routes/library"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerConfig_1 = __importDefault(require("./config/swaggerConfig"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerConfig_1.default));
app.use("/api", library_1.default);
config_1.default.sync().then(() => {
    console.log("Database connected");
    console.log("Swagger documentation available at /api-docs");
    app.listen(process.env.PORT || 3000, () => console.log("Server running"));
});
//# sourceMappingURL=server.js.map