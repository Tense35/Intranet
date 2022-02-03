//#region Importaciones
import { body, check, param } from 'express-validator';
import { Router } from 'express';
import { deleteRango, getRango, getRangos, postRango, putRango } from './rango.controller';
import { validarCampos } from '../../utils/middlewares/validarCampos';
import { rangoVerifyExist } from '../../utils/functions/verifyExist';
//#endregion

//#region Rutas
const router = Router();
    
router.get('/', getRangos);

router.get('/:id_rango', [
    param('id_rango', 'Debe de proporcionar un identificador del rango.')
        .notEmpty()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .toInt(),
    validarCampos
], getRango);

router.post('/', [
    body('id_rango', 'Debe de proporcionar un identificador del rango.')
        .notEmpty()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .toInt()
        .custom(async value => rangoVerifyExist(value, true)),
    check('nombre', 'Debe ingresar el nombre del rango.')
        .notEmpty()
        .isString().withMessage('El nombre del rango debe ser un string.')
        .isLength({ max: 30 }).withMessage('El nombre del rango es de máximo 30 caracteres.'),
    check('imagen', 'La imagen no es válida.')
        .isBase64()
        .optional({nullable: true, checkFalsy: true}),
    check('estado', 'El estado debe de ser de tipo boolean.')
        .isBoolean()
        .optional({nullable: true, checkFalsy: true}),
    validarCampos
], postRango);

router.put('/:id_rango', [
    param('id_rango', 'Debe de proporcionar un identificador del rango.')
        .notEmpty()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .toInt()
        .custom(async value => rangoVerifyExist(value, false)),
    check('nombre', 'El nombre del rango debe ser string')
        .isString()
        .isLength({ max: 30 }).withMessage('El nombre del rango es de máximo 30 caracteres.')
        .optional({nullable: true, checkFalsy: true}),
    check('imagen', 'La imagen no es válida.')
        .isBase64()
        .optional({nullable: true, checkFalsy: true}),
    check('estado', 'El estado debe de ser de tipo boolean.')
        .isBoolean()
        .optional({nullable: true, checkFalsy: true}),
    validarCampos
], putRango);

router.delete('/:id_rango', [
    param('id_rango', 'Debe de proporcionar un identificador del rango.')
        .notEmpty()
        .toInt()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .custom(async value => rangoVerifyExist(value, false)),
    validarCampos
], deleteRango);

//#endregion

export default router;