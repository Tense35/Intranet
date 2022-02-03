//#region Importaciones
import { body, check, param } from 'express-validator';
import { Router } from 'express';
import { validarCampos } from '../../utils/middlewares/validarCampos';
import { deletePolicia, getPolicia, getPolicias, postPolicia, putPolicia } from './policia.controller';
import { policiaVerifyExist, rangoVerifyExist } from '../../utils/functions/verifyExist';
//#endregion

//#region Rutas
const router = Router();
    
router.get('/', getPolicias);

router.get('/:id_policia', [
    param('id_policia', 'Debe de proporcionar un identificador del policía.')
        .notEmpty()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .toInt(),
    validarCampos
], getPolicia);

router.post('/', [
    body('id_policia', 'Debe de proporcionar un identificador del policía.')
        .notEmpty()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .toInt()
        .custom(async value => policiaVerifyExist(value, true)),
    body('id_rango', 'Debe de proporcionar un identificador del rango.')
        .notEmpty()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .toInt()
        .custom(async value => rangoVerifyExist(value, true)),
    body('email', 'Debe de proporcionar un email válido')
        .notEmpty()
        .isEmail()
        .custom(async value => policiaVerifyExist(value, true)),
    body('nombre', 'Debe ingresar el nombre del policía.')
        .notEmpty()
        .isString().withMessage('El nombre del policía debe ser un string.')
        .isLength({ max: 30 }).withMessage('El nombre del policía es de máximo 30 caracteres.'),
    body('pass', 'Debe ingresar una contraseña.')
        .notEmpty()
        .isLength({ max: 100 }).withMessage('El pass del policía es de máximo 100 caracteres.'),
    check('imagen', 'La imagen no es válida.')
        .isBase64()
        .optional({nullable: true, checkFalsy: true}),
    check('estado', 'El estado debe de ser de tipo boolean.')
        .isBoolean()
        .optional({nullable: true, checkFalsy: true}),
    validarCampos
], postPolicia);

router.put('/:id_policia', [
    param('id_policia', 'Debe de proporcionar un identificador del policía.')
        .notEmpty()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .toInt()
        .custom(async value => policiaVerifyExist(value, false)),
    body('id_rango', 'El identificador debe de ser numérico.')
        .isNumeric()
        .toInt()
        .optional({nullable: true, checkFalsy: true})
        .custom(async value => rangoVerifyExist(value, true)),
    body('email', 'Debe de proporcionar un email válido')
        .isEmail()
        .optional({nullable: true, checkFalsy: true})
        .custom(async value => policiaVerifyExist(value, true)),
    body('nombre', 'Debe ingresar el nombre del policía.')
        .isString().withMessage('El nombre del policía debe ser un string.')
        .isLength({ max: 30 }).withMessage('El nombre del policía es de máximo 30 caracteres.')
        .optional({nullable: true, checkFalsy: true}),
    body('pass', 'El pass del policía es de máximo 100 caracteres.')
        .isLength({ max: 100 })
        .optional({nullable: true, checkFalsy: true}),
    check('imagen', 'La imagen no es válida.')
        .isBase64()
        .optional({nullable: true, checkFalsy: true}),
    check('estado', 'El estado debe de ser de tipo boolean.')
        .isBoolean()
        .optional({nullable: true, checkFalsy: true}),
    validarCampos
], putPolicia);

router.delete('/:id_policia', [
    param('id_policia', 'Debe de proporcionar un identificador del policía.')
        .notEmpty()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .toInt()
        .custom(async value => policiaVerifyExist(value, false)),
    validarCampos
], deletePolicia);

//#endregion

export default router;