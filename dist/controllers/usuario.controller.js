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
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuarioById = exports.getUsuarios = void 0;
const sequelize_1 = require("sequelize");
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json({ msg: usuarios });
});
exports.getUsuarios = getUsuarios;
const getUsuarioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        res.status(400).json({ msg: "El usuario no existe" });
    }
    res.json({ msg: usuario });
});
exports.getUsuarioById = getUsuarioById;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const existeCorreo = yield usuario_1.default.findOne({
            where: {
                correo: body.correo,
            },
        });
        if (existeCorreo) {
            return res.status(400).json({ msg: "El correo ya esta registrado" });
        }
        const usuario = yield usuario_1.default.create(body);
        return res.json({ msg: usuario });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const { id } = req.params;
        const existeUsuario = yield usuario_1.default.findByPk(id);
        if (!existeUsuario) {
            return res.status(404).json({ msg: "El usuario no esta registrado" });
        }
        const existeCorreo = yield usuario_1.default.findOne({
            where: {
                correo: body.correo,
                id: {
                    [sequelize_1.Op.ne]: id, // Op.ne es para 'not equal' (diferente de)
                },
            },
        });
        if (existeCorreo) {
            return res.status(400).json({ msg: "El correo ya esta registrado" });
        }
        yield existeUsuario.update(body);
        return res.json({ msg: "usuario actualizado exitosamente" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ msg: "El usuario no esta registrado" });
        }
        yield usuario.destroy();
        return res.json({ msg: "usuario eliminado exitosamente" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuario.controller.js.map