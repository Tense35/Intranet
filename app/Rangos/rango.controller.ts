//#region Importaciones
import { Request, Response } from "express";
import HttpStatusCode from "../../utils/enums/HttpStatusCode";
import { IDeleteRequest, IGetRequest, IPostRequest, IPutRequest } from "../../models/interfaces/ServiceRequest";
import { IRangoViewInstance } from './rango.interface';
import RangoService from "./rango.service";
import SendResponse from "../../utils/class/SendResponse";
//#endregion

const rangoService = new RangoService();
const sendResponse = new SendResponse<IRangoViewInstance>('Rango - Controller');

export const getRangos = async( req: Request, res: Response ) => {
    sendResponse.subcomponente = 'getRangos';
    try {
        const request: IGetRequest = {
            query: req?.query
        }

        const rangos = await rangoService.getRangos(request);
        sendResponse.SuccesResponse(res, HttpStatusCode.Ok, rangos);
    }
    catch (error: unknown) {
        sendResponse.ErrorResponse(res, HttpStatusCode.InternalServerError, 'Contacte a un administrador', error);
    }
}

export const getRango = async( req: Request, res: Response ) => {
    sendResponse.subcomponente = 'getRango';
    try {
        const request: IGetRequest = {
            query: req?.query,
            params: req?.params
        }

        const rango = await rangoService.getRango(request);
        sendResponse.SuccesResponse(res, HttpStatusCode.Ok, rango);
    }
    catch (error: unknown) {
        sendResponse.ErrorResponse(res, HttpStatusCode.InternalServerError, 'Contacte a un administrador', error);
    }
}

export const putRango = async( req: Request, res: Response ) => {
    sendResponse.subcomponente = 'putRango';
    try {
        const request: IPutRequest = {
            body: req.body,
            params: req.params,
            files: req?.files,
            query: req?.query,
        }

        const rango =  await rangoService.putRango(request);

        (rango)
        ? sendResponse.SuccesResponse(res, HttpStatusCode.Ok, rango)
        : sendResponse.BadResponse(res, 'El identificador suministrado no existe o no es posible modificarlo.');
    }
    catch (error: unknown) {
        sendResponse.ErrorResponse(res, HttpStatusCode.InternalServerError, 'Contacte a un administrador', error);
    }
}

export const postRango = async( req: Request, res: Response ) => {
    sendResponse.subcomponente = 'postRango';
    try {
        const request: IPostRequest = {
            body: req.body,
            params: req.params,
            files: req?.files,
            query: req?.query,
        }
        
        const rango = await rangoService.postRango(request);
        
        (rango)
        ? sendResponse.SuccesResponse(res, HttpStatusCode.Ok, rango)
        : sendResponse.BadResponse(res, `No se puede crear el rango con el ID suministrado .`);

    }
    catch (error: unknown) {
        sendResponse.ErrorResponse(res, HttpStatusCode.InternalServerError, 'Contacte a un administrador', error);
    }
}

export const deleteRango = async( req: Request, res: Response ) => {
    sendResponse.subcomponente = 'deleteRango';
    try {
        const request: IDeleteRequest = {
            params: req.params,
            query: req?.query,
        }
        
        const rango = await rangoService.deleteRango(request);
        
        (rango)
        ? sendResponse.SuccesResponse(res, HttpStatusCode.Ok, rango)
        : sendResponse.BadResponse(res, `No se puede crear el rango con el ID suministrado .`);

    }
    catch (error: unknown) {
        sendResponse.ErrorResponse(res, HttpStatusCode.InternalServerError, 'Contacte a un administrador', error);
    }
}