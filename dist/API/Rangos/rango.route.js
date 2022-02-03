"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region Importaciones
//#region Terceros
const express_1 = require("express");
const rango_controller_1 = require("./rango.controller");
//#endregion
//#region Helpers y middlewares
//#endregion
//#endregion
// // Controladores
// import { getRenew, postLogin } from '../controllers/auth';
// // Helpers y middlewares
// import { emailNoExiste } from '../helpers/dbv-usuario';
// import { validarCampos } from '../middlewares/validar-campos';
// import validarJWT from '../middlewares/validar-jwt';
//#region Rutas
const router = (0, express_1.Router)();
// router.post('/',
// [
//     check('PK_rango', 'El email es obligatorio y debe ser un email válido').isNumeric(),
//     check('nombre').notEmpty()
//     //validarCampos
// ], postLogin);
router.get('/', rango_controller_1.getRangos);
//#endregion
exports.default = router;
//# sourceMappingURL=rango.route.js.map