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
//#region Importaciones
const Logs_1 = __importDefault(require("./Logs"));
const HttpStatusCode_1 = __importDefault(require("../../utils/enums/HttpStatusCode"));
const objectToArray_1 = __importDefault(require("../functions/objectToArray"));
//#endregion
/** Clase para responder a solicitudes HTTP */
class SendResponse {
    //#endregion
    /**
    * Establece el nombre del componente sobre el cual se está trabajando, a fin de generar logs en caso de errores.
    * @param  {string} componente Nombre del componente en el que se está instanciando la clase.
    */
    constructor(componente) {
        //#region Propiedades
        this.subcomponente = '';
        this.token = 'dslaldaspñf234je';
        this.componente = componente;
        this.log = new Logs_1.default(componente);
    }
    /**
    * Response con un JSON que retornará el código http, un nuevo token, la data suministrada y la cantidad de datos devueltos.
    * @param {Response} res                                                     Respuesta (Express)
    * @param {HttpStatusCode} httpStatusCode                                    Código HTTP que se responderá al cliente
    * @param {[T, number] | [T[], number] | [false, 0] = [false, 0]} data       Data que se retornará al cliente
    */
    SuccesResponse(res, httpStatusCode = HttpStatusCode_1.default.Ok, dbRequest = { rows: null, count: null }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows: data, count: total } = dbRequest;
            try {
                if (!data) {
                    this.CustomResponse(res, httpStatusCode, data);
                }
                else {
                    res.status(httpStatusCode).json({
                        ok: true,
                        errorMessage: null,
                        total,
                        token: this.token,
                        data: (0, objectToArray_1.default)(data)
                    });
                }
            }
            catch (ex) {
                this.log.Error(ex, this.subcomponente, 'Error TryCatch SendResponse.SuccesResponse');
            }
        });
    }
    /**
    * Response con un JSON que retornará el código http, un nuevo token y la data suministrada. No retorna la cantidad de datos retornados.
    * @param {Response} res                                                     Respuesta (Express)
    * @param {HttpStatusCode} httpStatusCode                                    Código HTTP que se responderá al cliente
    * @param {[T, number] | [T[], number] | [false, 0] = [false, 0]} data       Data que se retornará al cliente
    */
    CustomResponse(res, httpStatusCode = HttpStatusCode_1.default.NoContent, data = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(httpStatusCode).json({
                    ok: true,
                    errorMessage: null,
                    token: this.token,
                    data
                });
            }
            catch (ex) {
                this.log.Error(ex, this.subcomponente, 'Error TryCatch SendResponse.CustomResponse');
            }
        });
    }
    /**
    * Response con un JSON que retornará mensajes de error generados por el middleware de validarCampos.
    * @param {Response} res             Respuesta (Express)
    * @param {string} errorMessage      Mensaje de error que se retornará al cliente
    */
    BadResponse(res, errorMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(HttpStatusCode_1.default.BadRequest).json({
                    ok: false,
                    errorMessage,
                    total: 0,
                    data: []
                });
            }
            catch (ex) {
                this.log.Error(ex, this.subcomponente, 'Error TryCatch SendResponse.BadResponse');
            }
        });
    }
    /**
    * Response con un JSON que retornará un mensaje cuando no se tenga permiso para utilizar algún endpoint
    * @param {Response} res             Respuesta (Express)
    * @param {string} errorMessage      Mensaje de error que se retornará al cliente
    */
    UnauthorizedResponse(res, errorMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(HttpStatusCode_1.default.Unauthorized).json({
                    ok: false,
                    errorMessage: null,
                    total: 0,
                    data: []
                });
            }
            catch (ex) {
                this.log.Error(ex, this.subcomponente, 'Error TryCatch SendResponse.Unauthorized');
            }
        });
    }
    /**
    * Response con un JSON que retornará respuestas enfocadas a errores. Sólo debe utilizarse para excepciones
    * @param {Response} res                     Respuesta (Express)
    * @param {HttpStatusCode} httpStatusCode    Código HTTP que se responderá al cliente
    * @param {string} errorMessage              Mensaje de error que se retornará al cliente
    * @param {unknown} error                    Mensaje de error de la excepción. (Se almacenará en un log)
    */
    ErrorResponse(res, httpStatusCode = HttpStatusCode_1.default.InternalServerError, errorMessage = 'Error no especificado', error = 'No especificado') {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.log.Error(error, this.subcomponente, errorMessage);
                res.status(httpStatusCode | HttpStatusCode_1.default.InternalServerError).json({
                    ok: false,
                    errorMessage,
                    total: 0,
                    data: []
                });
            }
            catch (ex) {
                this.log.Error(ex, this.subcomponente, 'Error TryCatch SendResponse.ErrorResponse');
            }
        });
    }
}
exports.default = SendResponse;
//# sourceMappingURL=SendResponse.js.map