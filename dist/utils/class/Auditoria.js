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
const db_config_1 = __importDefault(require("../../config/db.config"));
const Logs_1 = __importDefault(require("./Logs"));
//#endregion
/** Clase para mantener la trazabilidad de inserciones, actualizaciones y eliminaciones de la base de datos. */
class Auditoria {
    constructor() {
        this.log = new Logs_1.default('Auditoria');
    }
    /**
    * Inserta información en la tabla de Auditoría para logs de trazabilidad
    * @param {Tables} id_tabla Identificador del rango que se desea buscar
    * @param {number} id_policia Identificador del policía que ejecuta la acción en la base de datos
    * @param {Actions} accion Acción que se realiza a nivel de base de datos (Update, Insert, etc..)
    * @return {Promise<Boolean>} Retorna un booleano indicando si la inserción fue correcta o no
    */
    InsertarAuditoria(id_tabla, id_policia, accion) {
        return __awaiter(this, void 0, void 0, function* () {
            db_config_1.default.query('EXEC SP_Auditoria :FK_tabla, :FK_policia, :FK_accion;', {
                replacements: { FK_tabla: id_tabla, FK_policia: id_policia, FK_accion: accion }
            })
                .then(() => {
                return true;
            })
                .catch(error => {
                this.log.Error(error, 'InsertarAuditoria', 'Error al utilizar el Store Procedure de Auditoría');
                return false;
            });
            return false;
        });
    }
}
exports.default = Auditoria;
//# sourceMappingURL=Auditoria.js.map