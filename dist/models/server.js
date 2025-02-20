"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usuario_routes_1 = __importDefault(require("../routes/usuario.routes"));
const conexion_1 = __importDefault(require("../db/conexion"));
class Server {
    constructor() {
        var _a;
        this.apiPaths = {
            usuarios: "/api/usuarios",
        };
        this.app = (0, express_1.default)();
        this.port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : "8000";
        // Conexion a la base de datos
        this.dbConexion();
        // Middlewares
        this.middlewares();
        // Definir rutas
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => console.log("Servidor corriendo en el puerto", this.port));
    }
    dbConexion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield conexion_1.default.authenticate();
                console.log("Conexion a la base de datos exitosa");
            }
            catch (error) {
                throw new Error("error al conectar a la base de datos");
            }
        });
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Lectura del body
        this.app.use(express_1.default.json());
        // Carpeta publica
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuario_routes_1.default);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map