"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToBoolean = void 0;
/**
* Permite convertir un string en un booleano. Por defecto, retonará true
* @param {string} value    Cadena que se evaluará para retornar un booleano
* @return {boolean}        Valor booleano en el que se convirtió la cadena suministrada
*/
const stringToBoolean = (value) => {
    switch (value.toLowerCase().trim()) {
        case "false":
        case "no":
        case "0":
        case "":
        case null:
        case undefined:
            return false;
        default: return true;
    }
};
exports.stringToBoolean = stringToBoolean;
//# sourceMappingURL=stringToBoolean.js.map