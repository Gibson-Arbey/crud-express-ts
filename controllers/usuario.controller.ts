import { Request, Response } from "express";
import { Op } from "sequelize";

import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll();

  res.json({ msg: usuarios });
};

export const getUsuarioById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    res.status(400).json({ msg: "El usuario no existe" });
  }
  res.json({ msg: usuario });
};

export const postUsuario = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const existeCorreo = await Usuario.findOne({
      where: {
        correo: body.correo,
      },
    });
    if (existeCorreo) {
      return res.status(400).json({ msg: "El correo ya esta registrado" });
    }
    const usuario = await Usuario.create(body);

    return res.json({ msg: usuario });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error });
  }
};

export const putUsuario = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const existeUsuario = await Usuario.findByPk(id);
    if (!existeUsuario) {
      return res.status(404).json({ msg: "El usuario no esta registrado" });
    }

    const existeCorreo = await Usuario.findOne({
      where: {
        correo: body.correo,
        id: {
          [Op.ne]: id, // Op.ne es para 'not equal' (diferente de)
        },
      },
    });
    if (existeCorreo) {
      return res.status(400).json({ msg: "El correo ya esta registrado" });
    }
    await existeUsuario.update(body);
    return res.json({ msg: "usuario actualizado exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ msg: "El usuario no esta registrado" });
    }

    await usuario.destroy();
    return res.json({ msg: "usuario eliminado exitosamente" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error });
  }
};
