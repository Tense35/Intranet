//#region Importaciones
import { Request, Response } from "express";
import HttpStatusCode from "../../utils/enums/HttpStatusCode";
import { IDeleteRequest, IGetRequest, IPostRequest, IPutRequest } from "../../models/interfaces/ServiceRequest";
import { IPoliciaViewInstance } from "./policia.interface";
import PoliciaService from './policia.service';
import SendResponse from "../../utils/class/SendResponse";
//#endregion

const policiaService = new PoliciaService();
const sendResponse = new SendResponse<IPoliciaViewInstance>('Policía - Controller');

export const getPolicias = async( req: Request, res: Response ) => {
    sendResponse.subcomponente = 'getPolicias';
    try {
        const request: IGetRequest = {
            query: req?.query
        }

        const policias = await policiaService.getPolicias(request);
        sendResponse.SuccesResponse(res, HttpStatusCode.Ok, policias);
    }
    catch (error: unknown) {
        sendResponse.ErrorResponse(res, HttpStatusCode.InternalServerError, 'Contacte a un administrador', error);
    }
}

export const getPolicia = async( req: Request, res: Response ) => {
    sendResponse.subcomponente = 'getPolicia';
    try {
        const request: IGetRequest = {
            query: req?.query,
            params: req?.params
        }

        const policia = await policiaService.getPolicia(request);
        sendResponse.SuccesResponse(res, HttpStatusCode.Ok, policia);
    }
    catch (error: unknown) {
        sendResponse.ErrorResponse(res, HttpStatusCode.InternalServerError, 'Contacte a un administrador', error);
    }
}

export const putPolicia = async( req: Request, res: Response ) => {
    sendResponse.subcomponente = 'putPolicia';
    try {
        const request: IPutRequest = {
            body: req.body,
            params: req.params,
            files: req?.files,
            query: req?.query,
        }

        const policia =  await policiaService.putPolicia(request);

        (policia)
        ? sendResponse.SuccesResponse(res, HttpStatusCode.Ok, policia)
        : sendResponse.BadResponse(res, 'El identificador suministrado no existe o no es posible modificarlo.');
    }
    catch (error: unknown) {
        sendResponse.ErrorResponse(res, HttpStatusCode.InternalServerError, 'Contacte a un administrador', error);
    }
}

export const postPolicia = async( req: Request, res: Response ) => {
    sendResponse.subcomponente = 'postPolicia';
    try {
        const request: IPostRequest = {
            body: req.body,
            params: req.params,
            files: req?.files,
            query: req?.query,
        }
        
        const policia = await policiaService.postPolicia(request);
        
        (policia)
        ? sendResponse.SuccesResponse(res, HttpStatusCode.Ok, policia)
        : sendResponse.BadResponse(res, `No se puede crear el policía con el ID suministrado .`);

    }
    catch (error: unknown) {
        sendResponse.ErrorResponse(res, HttpStatusCode.InternalServerError, 'Contacte a un administrador', error);
    }
}

export const deletePolicia = async( req: Request, res: Response ) => {
    sendResponse.subcomponente = 'deletePolicia';
    try {
        const request: IDeleteRequest = {
            params: req.params,
            query: req?.query,
        }
        
        const policia = await policiaService.deletePolicia(request);
        
        (policia)
        ? sendResponse.SuccesResponse(res, HttpStatusCode.Ok, policia)
        : sendResponse.BadResponse(res, `No se puede crear el policía con el ID suministrado .`);

    }
    catch (error: unknown) {
        sendResponse.ErrorResponse(res, HttpStatusCode.InternalServerError, 'Contacte a un administrador', error);
    }
}