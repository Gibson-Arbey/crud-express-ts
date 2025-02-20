"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { Check } from "express"
const usuario_controller_1 = require("../controllers/usuario.controller");
const router = (0, express_1.Router)();
router.get("/", usuario_controller_1.getUsuarios);
router.get("/:id", usuario_controller_1.getUsuarioById);
router.post("/", usuario_controller_1.postUsuario);
router.put("/:id", usuario_controller_1.putUsuario);
router.delete("/:id", usuario_controller_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuario.routes.js.map