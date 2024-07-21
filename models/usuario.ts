import { DataTypes } from "sequelize";
import db from "../db/conexion";

const Usuario = db.define("Usuario", {
  nombre: {
    type: DataTypes.STRING,
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
    type: DataTypes.STRING,
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
    type: DataTypes.STRING,
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
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
    // Opciones adicionales
    timestamps: true, // Para que Sequelize agregue createdAt y updatedAt
});

export default Usuario;
