//#region Importaciones
import Log from "./Logs";
import HttpStatusCode from "../../utils/enums/HttpStatusCode";
import objectToArray from "../functions/objectToArray";
import { Response } from "express";
//#endregion

/** Clase para responder a solicitudes HTTP */
class SendResponse<T> {
    //#region Propiedades
    public subcomponente: string = '';
    private componente: string;
    private token: string = 'dslaldaspñf234je';
    private log: Log;
    //#endregion

    /**
    * Establece el nombre del componente sobre el cual se está trabajando, a fin de generar logs en caso de errores.
    * @param  {string} componente Nombre del componente en el que se está instanciando la clase.
    */
    constructor( componente: string ) {
        this.componente = componente;
        this.log = new Log(componente);
    }

    /**
    * Response con un JSON que retornará el código http, un nuevo token, la data suministrada y la cantidad de datos devueltos.
    * @param {Response} res                                                     Respuesta (Express)
    * @param {HttpStatusCode} httpStatusCode                                    Código HTTP que se responderá al cliente
    * @param {[T, number] | [T[], number] | [false, 0] = [false, 0]} data       Data que se retornará al cliente
    */
    public async SuccesResponse(
        res: Response, 
        httpStatusCode: HttpStatusCode = HttpStatusCode.Ok, 
        dbRequest: { rows: T, count: number } | { rows: T[], count: number } | { rows: null, count: null } = { rows: null, count: null }
    ) {
        const { rows: data, count: total } = dbRequest;

        try {

            if ( !data ) {
                this.CustomResponse(res, httpStatusCode, data);
            }
            else {
                res.status(httpStatusCode).json({
                    ok: true,
                    errorMessage: null,
                    total,
                    token: this.token,
                    data: objectToArray(data)
                });
            }
            
        } catch (ex) {
            this.log.Error(ex, this.subcomponente, 'Error TryCatch SendResponse.SuccesResponse');
        }
    }

    /**
    * Response con un JSON que retornará el código http, un nuevo token y la data suministrada. No retorna la cantidad de datos retornados.
    * @param {Response} res                                                     Respuesta (Express)
    * @param {HttpStatusCode} httpStatusCode                                    Código HTTP que se responderá al cliente
    * @param {[T, number] | [T[], number] | [false, 0] = [false, 0]} data       Data que se retornará al cliente
    */
    public async CustomResponse(res: Response, httpStatusCode: HttpStatusCode = HttpStatusCode.NoContent, data: T | T[] | null | false = false) {
        try {
            res.status(httpStatusCode).json({
                ok: true,
                errorMessage: null,
                token: this.token,
                data
            });
        } catch (ex) {
            this.log.Error(ex, this.subcomponente, 'Error TryCatch SendResponse.CustomResponse');
        }
    }

    /**
    * Response con un JSON que retornará mensajes de error generados por el middleware de validarCampos.
    * @param {Response} res             Respuesta (Express)
    * @param {string} errorMessage      Mensaje de error que se retornará al cliente
    */
    public async BadResponse(res: Response, errorMessage: string) {
        try {
            res.status(HttpStatusCode.BadRequest).json({
                ok: false,
                errorMessage,
                total: 0,
                data: []
            });
        } catch (ex) {
            this.log.Error(ex, this.subcomponente, 'Error TryCatch SendResponse.BadResponse');
        }
    }

    /**
    * Response con un JSON que retornará un mensaje cuando no se tenga permiso para utilizar algún endpoint
    * @param {Response} res             Respuesta (Express)
    * @param {string} errorMessage      Mensaje de error que se retornará al cliente
    */
    public async UnauthorizedResponse(res: Response, errorMessage: string) {
        try {
            res.status(HttpStatusCode.Unauthorized).json({
                ok: false,
                errorMessage: null,
                total: 0,
                data: []
            });
        } catch (ex) {
            this.log.Error(ex, this.subcomponente, 'Error TryCatch SendResponse.Unauthorized');
        }
    }

    /**
    * Response con un JSON que retornará respuestas enfocadas a errores. Sólo debe utilizarse para excepciones
    * @param {Response} res                     Respuesta (Express)
    * @param {HttpStatusCode} httpStatusCode    Código HTTP que se responderá al cliente
    * @param {string} errorMessage              Mensaje de error que se retornará al cliente
    * @param {unknown} error                    Mensaje de error de la excepción. (Se almacenará en un log)
    */
    public async ErrorResponse( res: Response, httpStatusCode: HttpStatusCode = HttpStatusCode.InternalServerError, errorMessage: string = 'Error no especificado', error: unknown = 'No especificado' ): Promise<void> {
        try {
            this.log.Error(error, this.subcomponente, errorMessage);
            res.status(httpStatusCode | HttpStatusCode.InternalServerError).json({
                ok: false,
                errorMessage,
                total: 0,
                data: []
            });
        } catch (ex) {
            this.log.Error(ex, this.subcomponente, 'Error TryCatch SendResponse.ErrorResponse');
        }
    }
}

export default SendResponse;