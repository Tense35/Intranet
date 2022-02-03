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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Logs_1 = __importDefault(require("./Logs"));
//#endregion
/** Clase para interacciones relacionadas con el json web token.*/
class Jwt {
    constructor() {
        this.log = new Logs_1.default('Jwt');
    }
    /**
    * Inserta información en la tabla de Auditoría para logs de trazabilidad
    * @param {string} id            Identificador del policía propietario del token
    * @param {string} email         Email del policía propietario del token
    * @param {number} rango         Identificador del rango del policía propietario del token
    * @param {number} time          Tiempo en horas para la expiración del token. Por defecto tiene una duración de 24 hora, para tokens sin expiración deberá enviarse 0
    * @return {Promise<string>}     Retorna el token o un mensaje de error
    */
    Generate(id = '', email = '', rango = 1, time = 24) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const payload = { id, email, rango };
                const expiresIn = (time != 0)
                    ? (time.toString() + 'h')
                    : ('5y');
                jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY || '', { expiresIn }, (err, token) => {
                    if (err) {
                        this.log.Error(err, 'Generate', 'No se pudo generar el token');
                        reject('No se pudo generar el token');
                    }
                    else
                        resolve(token);
                });
            });
        });
    }
}
exports.default = Jwt;
//# sourceMappingURL=Jwt.js.map