"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
//#region Importación de rutas
const rango_route_1 = __importDefault(require("./Rangos/rango.route"));
const policia_route_1 = __importDefault(require("./Policias/policia.route"));
//#endregion
exports.routes = [
    { path: 'rango', router: rango_route_1.default },
    { path: 'policia', router: policia_route_1.default }
];
exports.default = exports.routes;
//# sourceMappingURL=routes.js.map