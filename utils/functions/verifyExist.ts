//#region Importaciones
import PoliciaService from "../../app/Policias/policia.service";
import RangoService from "../../app/Rangos/rango.service";
//#endregion

/**
* Permite verificar si el elemento existe o no dentro de la base de datos.
* @param {number} identificator     Identificador del elemento que se desea verificar.
* @param {boolean} itExist          Determina si se desea que el elemento exista o no para detener la ejecución.
*/
export const rangoVerifyExist = async ( identificator: number, itExist: boolean = true ) => {
    const rangoService = new RangoService();
    return rangoService.rangoExistente(identificator).then(({ exist }) => {
        if (exist && itExist) return Promise.reject('El identificador del rango proporcionado ya existe');
        if (!exist && !itExist) return Promise.reject('El identificador del rango proporcionado no existe');
    });
}

/**
* Permite verificar si el elemento existe o no dentro de la base de datos.
* @param {number | string} identificator     Identificador del elemento que se desea verificar, se puede verificar por el id del policía o por su email.
* @param {boolean} itExist          Determina si se desea que el elemento exista o no para detener la ejecución.
*/
export const policiaVerifyExist = async ( identificator: number | string, itExist: boolean = true ) => {
    const policiaService = new PoliciaService();
    return policiaService.policiaExistente(identificator).then(({ exist }) => {
        if (exist && itExist && (typeof identificator) === 'string') return Promise.reject('El email del policía proporcionado ya existe');
        if (exist && !itExist && (typeof identificator) === 'string') return Promise.reject('El email del policía proporcionado no existe');
        if (exist && itExist) return Promise.reject('El identificador del policía proporcionado ya existe');
        if (!exist && !itExist) return Promise.reject('El identificador del policía proporcionado no existe');
    });
}