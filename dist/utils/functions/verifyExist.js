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
exports.policiaVerifyExist = exports.rangoVerifyExist = void 0;
//#region Importaciones
const policia_service_1 = __importDefault(require("../../app/Policias/policia.service"));
const rango_service_1 = __importDefault(require("../../app/Rangos/rango.service"));
//#endregion
/**
* Permite verificar si el elemento existe o no dentro de la base de datos.
* @param {number} identificator     Identificador del elemento que se desea verificar.
* @param {boolean} itExist          Determina si se desea que el elemento exista o no para detener la ejecución.
*/
const rangoVerifyExist = (identificator, itExist = true) => __awaiter(void 0, void 0, void 0, function* () {
    const rangoService = new rango_service_1.default();
    return rangoService.rangoExistente(identificator).then(({ exist }) => {
        if (exist && itExist)
            return Promise.reject('El identificador del rango proporcionado ya existe');
        if (!exist && !itExist)
            return Promise.reject('El identificador del rango proporcionado no existe');
    });
});
exports.rangoVerifyExist = rangoVerifyExist;
/**
* Permite verificar si el elemento existe o no dentro de la base de datos.
* @param {number | string} identificator     Identificador del elemento que se desea verificar, se puede verificar por el id del policía o por su email.
* @param {boolean} itExist          Determina si se desea que el elemento exista o no para detener la ejecución.
*/
const policiaVerifyExist = (identificator, itExist = true) => __awaiter(void 0, void 0, void 0, function* () {
    const policiaService = new policia_service_1.default();
    return policiaService.policiaExistente(identificator).then(({ exist }) => {
        if (exist && itExist && (typeof identificator) === 'string')
            return Promise.reject('El email del policía proporcionado ya existe');
        if (exist && !itExist && (typeof identificator) === 'string')
            return Promise.reject('El email del policía proporcionado no existe');
        if (exist && itExist)
            return Promise.reject('El identificador del policía proporcionado ya existe');
        if (!exist && !itExist)
            return Promise.reject('El identificador del policía proporcionado no existe');
    });
});
exports.policiaVerifyExist = policiaVerifyExist;
//# sourceMappingURL=verifyExist.js.map