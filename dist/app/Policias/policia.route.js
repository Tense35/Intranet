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
const validarCampos_1 = require("../../utils/middlewares/validarCampos");
const policia_controller_1 = require("./policia.controller");
const verifyExist_1 = require("../../utils/functions/verifyExist");
//#endregion
//#region Rutas
const router = (0, express_1.Router)();
router.get('/', policia_controller_1.getPolicias);
router.get('/:id_policia', [
    (0, express_validator_1.param)('id_policia', 'Debe de proporcionar un identificador del policía.')
        .notEmpty()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .toInt(),
    validarCampos_1.validarCampos
], policia_controller_1.getPolicia);
router.post('/', [
    (0, express_validator_1.body)('id_policia', 'Debe de proporcionar un identificador del policía.')
        .notEmpty()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .toInt()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () { return (0, verifyExist_1.policiaVerifyExist)(value, true); })),
    (0, express_validator_1.body)('id_rango', 'Debe de proporcionar un identificador del rango.')
        .notEmpty()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .toInt()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () { return (0, verifyExist_1.rangoVerifyExist)(value, true); })),
    (0, express_validator_1.body)('email', 'Debe de proporcionar un email válido')
        .notEmpty()
        .isEmail()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () { return (0, verifyExist_1.policiaVerifyExist)(value, true); })),
    (0, express_validator_1.body)('nombre', 'Debe ingresar el nombre del policía.')
        .notEmpty()
        .isString().withMessage('El nombre del policía debe ser un string.')
        .isLength({ max: 30 }).withMessage('El nombre del policía es de máximo 30 caracteres.'),
    (0, express_validator_1.body)('pass', 'Debe ingresar una contraseña.')
        .notEmpty()
        .isLength({ max: 100 }).withMessage('El pass del policía es de máximo 100 caracteres.'),
    (0, express_validator_1.check)('imagen', 'La imagen no es válida.')
        .isBase64()
        .optional({ nullable: true, checkFalsy: true }),
    (0, express_validator_1.check)('estado', 'El estado debe de ser de tipo boolean.')
        .isBoolean()
        .optional({ nullable: true, checkFalsy: true }),
    validarCampos_1.validarCampos
], policia_controller_1.postPolicia);
router.put('/:id_policia', [
    (0, express_validator_1.param)('id_policia', 'Debe de proporcionar un identificador del policía.')
        .notEmpty()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .toInt()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () { return (0, verifyExist_1.policiaVerifyExist)(value, false); })),
    (0, express_validator_1.body)('id_rango', 'El identificador debe de ser numérico.')
        .isNumeric()
        .toInt()
        .optional({ nullable: true, checkFalsy: true })
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () { return (0, verifyExist_1.rangoVerifyExist)(value, true); })),
    (0, express_validator_1.body)('email', 'Debe de proporcionar un email válido')
        .isEmail()
        .optional({ nullable: true, checkFalsy: true })
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () { return (0, verifyExist_1.policiaVerifyExist)(value, true); })),
    (0, express_validator_1.body)('nombre', 'Debe ingresar el nombre del policía.')
        .isString().withMessage('El nombre del policía debe ser un string.')
        .isLength({ max: 30 }).withMessage('El nombre del policía es de máximo 30 caracteres.')
        .optional({ nullable: true, checkFalsy: true }),
    (0, express_validator_1.body)('pass', 'El pass del policía es de máximo 100 caracteres.')
        .isLength({ max: 100 })
        .optional({ nullable: true, checkFalsy: true }),
    (0, express_validator_1.check)('imagen', 'La imagen no es válida.')
        .isBase64()
        .optional({ nullable: true, checkFalsy: true }),
    (0, express_validator_1.check)('estado', 'El estado debe de ser de tipo boolean.')
        .isBoolean()
        .optional({ nullable: true, checkFalsy: true }),
    validarCampos_1.validarCampos
], policia_controller_1.putPolicia);
router.delete('/:id_policia', [
    (0, express_validator_1.param)('id_policia', 'Debe de proporcionar un identificador del policía.')
        .notEmpty()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .toInt()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () { return (0, verifyExist_1.policiaVerifyExist)(value, false); })),
    validarCampos_1.validarCampos
], policia_controller_1.deletePolicia);
//#endregion
exports.default = router;
//# sourceMappingURL=policia.route.js.map