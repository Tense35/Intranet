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
exports.getRangos = void 0;
const SendResponse_1 = __importDefault(require("../../utils/class/SendResponse"));
const HttpStatusCode_1 = __importDefault(require("../../utils/enums/HttpStatusCode"));
const rango_service_1 = __importDefault(require("./rango.service"));
//#endregion
const sendResponse = new SendResponse_1.default('Rango - Controller');
const rangoService = new rango_service_1.default();
const getRangos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rangos = yield rangoService.getRangos();
        sendResponse.SuccesResponse(res, HttpStatusCode_1.default.Ok, rangos);
    }
    catch (error) {
        sendResponse.ErrorResponse(res, HttpStatusCode_1.default.InternalServerError, 'Contacte a un administrador', error);
    }
});
exports.getRangos = getRangos;
//# sourceMappingURL=rango.controller.js.map