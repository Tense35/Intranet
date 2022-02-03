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
exports.deletePolicia = exports.postPolicia = exports.putPolicia = exports.getPolicia = exports.getPolicias = void 0;
const HttpStatusCode_1 = __importDefault(require("../../utils/enums/HttpStatusCode"));
const policia_service_1 = __importDefault(require("./policia.service"));
const SendResponse_1 = __importDefault(require("../../utils/class/SendResponse"));
//#endregion
const policiaService = new policia_service_1.default();
const sendResponse = new SendResponse_1.default('Policía - Controller');
const getPolicias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    sendResponse.subcomponente = 'getPolicias';
    try {
        const request = {
            query: req === null || req === void 0 ? void 0 : req.query
        };
        const policias = yield policiaService.getPolicias(request);
        sendResponse.SuccesResponse(res, HttpStatusCode_1.default.Ok, policias);
    }
    catch (error) {
        sendResponse.ErrorResponse(res, HttpStatusCode_1.default.InternalServerError, 'Contacte a un administrador', error);
    }
});
exports.getPolicias = getPolicias;
const getPolicia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    sendResponse.subcomponente = 'getPolicia';
    try {
        const request = {
            query: req === null || req === void 0 ? void 0 : req.query,
            params: req === null || req === void 0 ? void 0 : req.params
        };
        const policia = yield policiaService.getPolicia(request);
        sendResponse.SuccesResponse(res, HttpStatusCode_1.default.Ok, policia);
    }
    catch (error) {
        sendResponse.ErrorResponse(res, HttpStatusCode_1.default.InternalServerError, 'Contacte a un administrador', error);
    }
});
exports.getPolicia = getPolicia;
const putPolicia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    sendResponse.subcomponente = 'putPolicia';
    try {
        const request = {
            body: req.body,
            params: req.params,
            files: req === null || req === void 0 ? void 0 : req.files,
            query: req === null || req === void 0 ? void 0 : req.query,
        };
        const policia = yield policiaService.putPolicia(request);
        (policia)
            ? sendResponse.SuccesResponse(res, HttpStatusCode_1.default.Ok, policia)
            : sendResponse.BadResponse(res, 'El identificador suministrado no existe o no es posible modificarlo.');
    }
    catch (error) {
        sendResponse.ErrorResponse(res, HttpStatusCode_1.default.InternalServerError, 'Contacte a un administrador', error);
    }
});
exports.putPolicia = putPolicia;
const postPolicia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    sendResponse.subcomponente = 'postPolicia';
    try {
        const request = {
            body: req.body,
            params: req.params,
            files: req === null || req === void 0 ? void 0 : req.files,
            query: req === null || req === void 0 ? void 0 : req.query,
        };
        const policia = yield policiaService.postPolicia(request);
        (policia)
            ? sendResponse.SuccesResponse(res, HttpStatusCode_1.default.Ok, policia)
            : sendResponse.BadResponse(res, `No se puede crear el policía con el ID suministrado .`);
    }
    catch (error) {
        sendResponse.ErrorResponse(res, HttpStatusCode_1.default.InternalServerError, 'Contacte a un administrador', error);
    }
});
exports.postPolicia = postPolicia;
const deletePolicia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    sendResponse.subcomponente = 'deletePolicia';
    try {
        const request = {
            params: req.params,
            query: req === null || req === void 0 ? void 0 : req.query,
        };
        const policia = yield policiaService.deletePolicia(request);
        (policia)
            ? sendResponse.SuccesResponse(res, HttpStatusCode_1.default.Ok, policia)
            : sendResponse.BadResponse(res, `No se puede crear el policía con el ID suministrado .`);
    }
    catch (error) {
        sendResponse.ErrorResponse(res, HttpStatusCode_1.default.InternalServerError, 'Contacte a un administrador', error);
    }
});
exports.deletePolicia = deletePolicia;
//# sourceMappingURL=policia.controller.js.map