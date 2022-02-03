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
const Security_1 = __importDefault(require("../../utils/class/Security"));
const stringToBoolean_1 = require("../../utils/functions/stringToBoolean");
const Tables_1 = __importDefault(require("../../utils/enums/Tables"));
const policia_model_1 = require("./policia.model");
const UploadFiles_1 = __importDefault(require("../../utils/class/UploadFiles"));
//#endregion
/** Servicio para la interacción de la base de datos con la tabla Policia. */
class PoliciaService {
    constructor() {
        this.auditoria = new Auditoria_1.default();
        this.order = [['id_rango', 'ASC']];
        this.security = new Security_1.default();
        this.uploadFiles = new UploadFiles_1.default(Tables_1.default.Policia);
        /**
        * Retorna un objeto con los queryParameters enviados, convertidos en su respectivo tipo de dato.
        * @param {object} queryParams   Objeto con los query parameters enviados al API.
        * @return {object}              Objeto con los parámetros de consulta convertidos a su tipo de dato.
        */
        this.verifyQuery = (queryParams) => {
            try {
                const allowedParameters = {
                    all: ['id_policia', 'id_rango', 'nombre_policia', 'nombre_rango', 'email', 'imagen_policia', 'imagen_rango', 'ingreso', 'estado', 'limit', 'offset'],
                    boolean: ['estado'],
                    number: ['id_policia', 'id_rango', 'limit', 'offset']
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
    * Retorna todos los policías de la base de datos que coincidan con la consulta solicitada.
    * @param {IGetRequest} request      Objeto con la data enviada de la solicitud.
    * @return {IPoliciaViewInstance[]}    Lista de policías retornados por la vista.
    */
    getPolicias(request = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = this.verifyQuery(request === null || request === void 0 ? void 0 : request.query), { limit = 40, offset = 0 } = _a, where = __rest(_a, ["limit", "offset"]);
            return policia_model_1.VW_PoliciaModel.findAndCountAll({
                where,
                limit,
                offset,
                order: this.order,
            });
        });
    }
    /**
    * Retorna un policía específico de la vista de base de datos
    * @param {IGetRequest} request      Objeto con la data enviada de la solicitud.
    * @return {IPoliciaViewInstance[]}  Policía específico.
    */
    getPolicia(request = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = this.verifyQuery(request === null || request === void 0 ? void 0 : request.query), { limit = 40, offset = 0 } = _a, where = __rest(_a, ["limit", "offset"]);
            where['id_policia'] = request === null || request === void 0 ? void 0 : request.params;
            return policia_model_1.VW_PoliciaModel.findAndCountAll({
                where,
                limit,
                offset,
                order: this.order,
            });
        });
    }
    /**
    * Actualiza la información de un policía específico
    * @param {IPutRequest} request      Objeto con la data enviada de la solicitud.
    * @return {IPoliciaViewInstance[]}  Policía específico retornado por la tabla.
    */
    putPolicia(request = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body, params, files, query } = request;
            const { data } = yield this.policiaExistente(params.id_policia);
            if (files) {
                body.imagen = (data.imagen)
                    ? yield this.uploadFiles.update(files, data.imagen)
                    : yield this.uploadFiles.upload(files);
            }
            if (body.id_rango)
                body['PK_rango'] = body.id_rango;
            if (body.pass)
                body['pass'] = this.security.Encrypt(body.pass);
            const update = (yield (data === null || data === void 0 ? void 0 : data.update(body))) || null;
            if (update) {
                this.auditoria.InsertarAuditoria(Tables_1.default.Policia, Number(1), Actions_1.default.Update);
                return this.getPolicias(this.verifyQuery(query));
            }
            return null;
        });
    }
    /**
    * Crea un nuevo policía en la base de datos.
    * @param {IPostRequest} request     Objeto con la data enviada de la solicitud.
    * @return {IPoliciaViewInstance[]}  Policía específico retornado por la tabla.
    */
    postPolicia(request = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body, params, files, query } = request;
            if (files) {
                const imgUrl = yield this.uploadFiles.upload(files);
                if (imgUrl)
                    body.imagen = imgUrl;
            }
            body['PK_policia'] = body.id_policia;
            body['PK_rango'] = body.id_rango;
            body['pass'] = this.security.Encrypt(body.pass);
            const data = (yield policia_model_1.TBL_PoliciaModel.create(body)) || null;
            if (data) {
                this.auditoria.InsertarAuditoria(Tables_1.default.Policia, Number(1), Actions_1.default.Insert);
                return this.getPolicias(this.verifyQuery(query));
            }
            return null;
        });
    }
    /**
    * Realiza un borrado lógico en la base de datos del policía especificado.
    * @param {IDeleteRequest} request   Objeto con la data enviada de la solicitud.
    * @return {IPoliciaViewInstance[]}  Policía específico retornado por la tabla.
    */
    deletePolicia(request = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params } = request;
            const policia = yield this.putPolicia(request);
            if (policia) {
                this.auditoria.InsertarAuditoria(Tables_1.default.Policia, Number(params.id_jwt), Actions_1.default.Delete);
                return policia;
            }
            return null;
        });
    }
    /**
    * Retorna un policía específico de la tabla de base de datos
    * @param {number} id_policia          Identificador del policía que se desea buscar
    * @return {IPoliciaTableInstance[]}   Policía específico retornado por la tabla
    */
    getPoliciaTabla(id_policia) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = ((typeof id_policia) === 'number')
                ? { PK_policia: id_policia }
                : { email: id_policia };
            return policia_model_1.TBL_PoliciaModel.findAndCountAll({
                where
            });
        });
    }
    /**
    * Verifica si existe un policía con un identificador específico
    * @param {number} id_policia          Identificador del policía que se desea verificar
    * @return {IPoliciaTableInstance[]}   Policía específico retornado por la tabla
    */
    policiaExistente(id_policia) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows: data, count: total } = yield this.getPoliciaTabla(id_policia);
            return (total < 1)
                ? { exist: false, data: data[0] }
                : { exist: true, data: data[0] };
        });
    }
}
exports.default = PoliciaService;
//# sourceMappingURL=policia.service.js.map