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
Object.defineProperty(exports, "__esModule", { value: true });
//#region Importaciones
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const rango_controller_1 = require("./rango.controller");
const validarCampos_1 = require("../../utils/middlewares/validarCampos");
const verifyExist_1 = require("../../utils/functions/verifyExist");
//#endregion
//#region Rutas
const router = (0, express_1.Router)();
router.get('/', rango_controller_1.getRangos);
router.get('/:id_rango', [
    (0, express_validator_1.param)('id_rango', 'Debe de proporcionar un identificador del rango.')
        .notEmpty()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .toInt(),
    validarCampos_1.validarCampos
], rango_controller_1.getRango);
router.post('/', [
    (0, express_validator_1.body)('id_rango', 'Debe de proporcionar un identificador del rango.')
        .notEmpty()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .toInt()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () { return (0, verifyExist_1.rangoVerifyExist)(value, true); })),
    (0, express_validator_1.check)('nombre', 'Debe ingresar el nombre del rango.')
        .notEmpty()
        .isString().withMessage('El nombre del rango debe ser un string.')
        .isLength({ max: 30 }).withMessage('El nombre del rango es de máximo 30 caracteres.'),
    (0, express_validator_1.check)('imagen', 'La imagen no es válida.')
        .isBase64()
        .optional({ nullable: true, checkFalsy: true }),
    (0, express_validator_1.check)('estado', 'El estado debe de ser de tipo boolean.')
        .isBoolean()
        .optional({ nullable: true, checkFalsy: true }),
    validarCampos_1.validarCampos
], rango_controller_1.postRango);
router.put('/:id_rango', [
    (0, express_validator_1.param)('id_rango', 'Debe de proporcionar un identificador del rango.')
        .notEmpty()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .toInt()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () { return (0, verifyExist_1.rangoVerifyExist)(value, false); })),
    (0, express_validator_1.check)('nombre', 'El nombre del rango debe ser string')
        .isString()
        .isLength({ max: 30 }).withMessage('El nombre del rango es de máximo 30 caracteres.')
        .optional({ nullable: true, checkFalsy: true }),
    (0, express_validator_1.check)('imagen', 'La imagen no es válida.')
        .isBase64()
        .optional({ nullable: true, checkFalsy: true }),
    (0, express_validator_1.check)('estado', 'El estado debe de ser de tipo boolean.')
        .isBoolean()
        .optional({ nullable: true, checkFalsy: true }),
    validarCampos_1.validarCampos
], rango_controller_1.putRango);
router.delete('/:id_rango', [
    (0, express_validator_1.param)('id_rango', 'Debe de proporcionar un identificador del rango.')
        .notEmpty()
        .toInt()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () { return (0, verifyExist_1.rangoVerifyExist)(value, false); })),
    validarCampos_1.validarCampos
], rango_controller_1.deleteRango);
//#endregion
exports.default = router;
//# sourceMappingURL=rango.route.js.map