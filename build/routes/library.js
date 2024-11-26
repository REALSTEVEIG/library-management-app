"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const controller = __importStar(require("../controller/library"));
const router = express_1.default.Router();
// User routes
router.get("/users", controller.listUsersController);
router.get("/users/:id", [(0, express_validator_1.param)("id").isInt()], controller.getUserController);
router.post("/users", [(0, express_validator_1.body)("name").notEmpty()], controller.createUserController);
// Book routes
router.get("/books", controller.listBooksController);
router.get("/books/:id", [(0, express_validator_1.param)("id").isInt()], controller.getBookController);
router.post("/books", [(0, express_validator_1.body)("name").notEmpty()], controller.createBookController);
// Borrow/Return routes
router.post("/users/:userId/borrow/:bookId", [(0, express_validator_1.param)("userId").isInt(), (0, express_validator_1.param)("bookId").isInt()], controller.borrowBookController);
router.post("/users/:userId/return/:borrowId", [(0, express_validator_1.param)("borrowId").isInt(), (0, express_validator_1.body)("score").isFloat({ min: 0, max: 10 })], controller.returnBookController);
exports.default = router;
//# sourceMappingURL=library.js.map