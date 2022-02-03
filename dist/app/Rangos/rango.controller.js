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
exports.deleteRango = exports.postRango = exports.putRango = exports.getRango = exports.getRangos = void 0;
const HttpStatusCode_1 = __importDefault(require("../../utils/enums/HttpStatusCode"));
const rango_service_1 = __importDefault(require("./rango.service"));
const SendResponse_1 = __importDefault(require("../../utils/class/SendResponse"));
//#endregion
const rangoService = new rango_service_1.default();
const sendResponse = new SendResponse_1.default('Rango - Controller');
const getRangos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    sendResponse.subcomponente = 'getRangos';
    try {
        const request = {
            query: req === null || req === void 0 ? void 0 : req.query
        };
        const rangos = yield rangoService.getRangos(request);
        sendResponse.SuccesResponse(res, HttpStatusCode_1.default.Ok, rangos);
    }
    catch (error) {
        sendResponse.ErrorResponse(res, HttpStatusCode_1.default.InternalServerError, 'Contacte a un administrador', error);
    }
});
exports.getRangos = getRangos;
const getRango = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    sendResponse.subcomponente = 'getRango';
    try {
        const request = {
            query: req === null || req === void 0 ? void 0 : req.query,
            params: req === null || req === void 0 ? void 0 : req.params
        };
        const rango = yield rangoService.getRango(request);
        sendResponse.SuccesResponse(res, HttpStatusCode_1.default.Ok, rango);
    }
    catch (error) {
        sendResponse.ErrorResponse(res, HttpStatusCode_1.default.InternalServerError, 'Contacte a un administrador', error);
    }
});
exports.getRango = getRango;
const putRango = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    sendResponse.subcomponente = 'putRango';
    try {
        const request = {
            body: req.body,
            params: req.params,
            files: req === null || req === void 0 ? void 0 : req.files,
            query: req === null || req === void 0 ? void 0 : req.query,
        };
        const rango = yield rangoService.putRango(request);
        (rango)
            ? sendResponse.SuccesResponse(res, HttpStatusCode_1.default.Ok, rango)
            : sendResponse.BadResponse(res, 'El identificador suministrado no existe o no es posible modificarlo.');
    }
    catch (error) {
        sendResponse.ErrorResponse(res, HttpStatusCode_1.default.InternalServerError, 'Contacte a un administrador', error);
    }
});
exports.putRango = putRango;
const postRango = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    sendResponse.subcomponente = 'postRango';
    try {
        const request = {
            body: req.body,
            params: req.params,
            files: req === null || req === void 0 ? void 0 : req.files,
            query: req === null || req === void 0 ? void 0 : req.query,
        };
        const rango = yield rangoService.postRango(request);
        (rango)
            ? sendResponse.SuccesResponse(res, HttpStatusCode_1.default.Ok, rango)
            : sendResponse.BadResponse(res, `No se puede crear el rango con el ID suministrado .`);
    }
    catch (error) {
        sendResponse.ErrorResponse(res, HttpStatusCode_1.default.InternalServerError, 'Contacte a un administrador', error);
    }
});
exports.postRango = postRango;
const deleteRango = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    sendResponse.subcomponente = 'deleteRango';
    try {
        const request = {
            params: req.params,
            query: req === null || req === void 0 ? void 0 : req.query,
        };
        const rango = yield rangoService.deleteRango(request);
        (rango)
            ? sendResponse.SuccesResponse(res, HttpStatusCode_1.default.Ok, rango)
            : sendResponse.BadResponse(res, `No se puede crear el rango con el ID suministrado .`);
    }
    catch (error) {
        sendResponse.ErrorResponse(res, HttpStatusCode_1.default.InternalServerError, 'Contacte a un administrador', error);
    }
});
exports.deleteRango = deleteRango;
//# sourceMappingURL=rango.controller.js.map