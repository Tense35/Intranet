"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCampos = void 0;
const express_validator_1 = require("express-validator");
const SendResponse_1 = __importDefault(require("../class/SendResponse"));
//#endregion
const sendResponse = new SendResponse_1.default('Validación de campos');
const validarCampos = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const msg = errors['errors'][0].msg;
        return sendResponse.BadResponse(res, msg);
    }
    next();
};
exports.validarCampos = validarCampos;
//# sourceMappingURL=validarCampos.js.map