"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const rango_route_1 = __importDefault(require("./Rangos/rango.route"));
//#endregion
exports.routes = [
    { path: 'rango', router: rango_route_1.default }
];
exports.default = exports.routes;
//# sourceMappingURL=routes.js.map