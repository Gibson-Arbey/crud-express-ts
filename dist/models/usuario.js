"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../db/conexion"));
const Usuario = conexion_1.default.define("Usuario", {
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "El nombre no puede estar vacío",
            },
            len: {
                args: [3, 255],
                msg: "El nombre debe tener entre 3 y 255 caracteres",
            },
        },
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: {
            name: 'uniqueCorreo',
            msg: "El correo electrónico ya está en uso",
        },
        validate: {
            notEmpty: {
                msg: "El correo electrónico no puede estar vacío",
            },
            isEmail: {
                msg: "El correo electrónico no tiene un formato válido",
            },
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "La contraseña no puede estar vacía",
            },
            len: {
                args: [8, 128],
                msg: "La contraseña debe tener entre 8 y 128 caracteres",
            },
        },
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    // Opciones adicionales
    timestamps: true, // Para que Sequelize agregue createdAt y updatedAt
});
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map