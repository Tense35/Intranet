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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Actions_1 = __importDefault(require("../../utils/enums/Actions"));
const Auditoria_1 = __importDefault(require("../../utils/class/Auditoria"));
const stringToBoolean_1 = require("../../utils/functions/stringToBoolean");
const Tables_1 = __importDefault(require("../../utils/enums/Tables"));
const UploadFiles_1 = __importDefault(require("../../utils/class/UploadFiles"));
const rango_model_1 = require("./rango.model");
//#endregion
/** Servicio para la interacción de la base de datos con la tabla Rango. */
class RangoService {
    constructor() {
        this.auditoria = new Auditoria_1.default();
        this.order = [['id_rango', 'ASC']];
        this.uploadFiles = new UploadFiles_1.default(Tables_1.default.Rango);
        /**
        * Retorna un objeto con los queryParameters enviados, convertidos en su respectivo tipo de dato.
        * @param {object} queryParams   Objeto con los query parameters enviados al API.
        * @return {object}              Objeto con los parámetros de consulta convertidos a su tipo de dato.
        */
        this.verifyQuery = (queryParams) => {
            try {
                const allowedParameters = {
                    all: ['id_rango', 'cantidad_policias', 'nombre_rango', 'id_rango', 'estado', 'imagen', 'limit', 'offset'],
                    boolean: ['estado'],
                    number: ['id_rango', 'cantidad_policias', 'limit', 'offset']
                };
                let where = {};
                for (const param in queryParams) {
                    const parameter = param.toLowerCase().trim();
                    if (allowedParameters.all.includes(parameter) && parameter != null && parameter != undefined) {
                        if (allowedParameters.boolean.includes(parameter))
                            queryParams[param] = (0, stringToBoolean_1.stringToBoolean)(queryParams[param]);
                        if (allowedParameters.number.includes(parameter))
                            queryParams[param] = Number(queryParams[param]);
                        where[param] = queryParams[param];
                    }
                }
                return where;
            }
            catch (err) {
                return {};
            }
        };
    }
    /**
    * Retorna todos los rangos de la base de datos que coincidan con la consulta solicitada.
    * @param {IGetRequest} request      Objeto con la data enviada de la solicitud.
    * @return {IRangoViewInstance[]}    Lista de rangos retornados por la vista.
    */
    getRangos(request = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = this.verifyQuery(request === null || request === void 0 ? void 0 : request.query), { limit = 40, offset = 0 } = _a, where = __rest(_a, ["limit", "offset"]);
            return rango_model_1.VW_RangoModel.findAndCountAll({
                where,
                limit,
                offset,
                order: this.order,
            });
        });
    }
    /**
    * Retorna un rango específico de la vista de base de datos
    * @param {IGetRequest} request      Objeto con la data enviada de la solicitud.
    * @return {IRangoViewInstance[]}    Rango específico.
    */
    getRango(request = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = this.verifyQuery(request === null || request === void 0 ? void 0 : request.query), { limit = 40, offset = 0 } = _a, where = __rest(_a, ["limit", "offset"]);
            where['id_rango'] = request === null || request === void 0 ? void 0 : request.params;
            return rango_model_1.VW_RangoModel.findAndCountAll({
                where,
                limit,
                offset,
                order: this.order,
            });
        });
    }
    /**
    * Actualiza la información de un rango específico
    * @param {IPutRequest} request      Objeto con la data enviada de la solicitud.
    * @return {IRangoViewInstance[]}    Rango específico retornado por la tabla.
    */
    putRango(request = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body, params, files, query } = request;
            const { data } = yield this.rangoExistente(params.id_rango);
            if (files) {
                body.imagen = (data.imagen)
                    ? yield this.uploadFiles.update(files, data.imagen)
                    : yield this.uploadFiles.upload(files);
            }
            const update = (yield (data === null || data === void 0 ? void 0 : data.update(body))) || null;
            if (update) {
                this.auditoria.InsertarAuditoria(Tables_1.default.Rango, Number(1), Actions_1.default.Update);
                return this.getRangos(this.verifyQuery(query));
            }
            return null;
        });
    }
    /**
    * Crea un nuevo rango en la base de datos.
    * @param {IPostRequest} request     Objeto con la data enviada de la solicitud.
    * @return {IRangoViewInstance[]}    Rango específico retornado por la tabla.
    */
    postRango(request = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body, params, files, query } = request;
            if (files) {
                const imgUrl = yield this.uploadFiles.upload(files);
                if (imgUrl)
                    body.imagen = imgUrl;
            }
            body['PK_rango'] = body.id_rango;
            const data = (yield rango_model_1.TBL_RangoModel.create(body)) || null;
            if (data) {
                this.auditoria.InsertarAuditoria(Tables_1.default.Rango, Number(1), Actions_1.default.Insert);
                return this.getRangos(this.verifyQuery(query));
            }
            return null;
        });
    }
    /**
    * Realiza un borrado lógico en la base de datos del rango especificado.
    * @param {IDeleteRequest} request   Objeto con la data enviada de la solicitud.
    * @return {IRangoViewInstance[]}    Rango específico retornado por la tabla.
    */
    deleteRango(request = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params } = request;
            const rango = yield this.putRango(request);
            if (rango) {
                this.auditoria.InsertarAuditoria(Tables_1.default.Rango, Number(params.id_jwt), Actions_1.default.Delete);
                return rango;
            }
            return null;
        });
    }
    /**
    * Retorna un rango específico de la tabla de base de datos
    * @param {number} id_rango          Identificador del rango que se desea buscar
    * @return {IRangoTableInstance[]}   Rango específico retornado por la tabla
    */
    getRangoTabla(id_rango) {
        return __awaiter(this, void 0, void 0, function* () {
            return rango_model_1.TBL_RangoModel.findAndCountAll({
                where: { PK_rango: id_rango }
            });
        });
    }
    /**
    * Verifica si existe un rango con un identificador específico
    * @param {number} id_rango          Identificador del rango que se desea verificar
    * @return {IRangoTableInstance[]}   Rango específico retornado por la tabla
    */
    rangoExistente(id_rango) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { rows: data, count: total } = yield this.getRangoTabla(id_rango);
            return (total < 1 || ((_a = data[0]) === null || _a === void 0 ? void 0 : _a.nombre) === 'Administrador')
                ? { exist: false, data: data[0] }
                : { exist: true, data: data[0] };
        });
    }
}
exports.default = RangoService;
//# sourceMappingURL=rango.service.js.map