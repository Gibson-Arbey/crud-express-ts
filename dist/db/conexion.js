"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database = (_a = process.env.DATABASE) !== null && _a !== void 0 ? _a : 'database';
const user = (_b = process.env.USER_DB) !== null && _b !== void 0 ? _b : 'user';
const password = (_c = process.env.PASS_DB) !== null && _c !== void 0 ? _c : 'password';
const host = (_d = process.env.HOST_DB) !== null && _d !== void 0 ? _d : 'localhost';
const db = new sequelize_1.Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    logging: console.log
});
exports.default = db;
//# sourceMappingURL=conexion.js.map