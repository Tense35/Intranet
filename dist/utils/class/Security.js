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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/** Clase para temas relacionados a encriptación de datos. */
class Security {
    constructor() {
        this.salt = bcryptjs_1.default.genSaltSync();
    }
    /**
    * Permite encriptar un dato
    * @param {string} data      Dato que se desea encriptar.
    * @return {string}          Dato encriptado.
    */
    Encrypt(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcryptjs_1.default.hashSync(data, this.salt);
        });
    }
    /**
    * Permite comparar si un dato no encriptado es equivalente a un dato encriptado.
    * @param {string} data      Dato que se desea encriptar.
    * @param {string} password  Identificador del rango que se desea buscar.
    * @return {boolean}         Resultado de la verificación.
    */
    verifyEncrypt(password, encryptedData) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcryptjs_1.default.compareSync(password, encryptedData);
        });
    }
}
exports.default = Security;
//# sourceMappingURL=Security.js.map