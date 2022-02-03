"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* Convierte un objeto o cadena en un array
* @param {object | object[]} element    Objeto, string o array de objetos que serán convertidos a un array.
* @return {object[]}                    Array de objetos
*/
const objectToArray = (element) => {
    if (Array.isArray(element)) {
        return element;
    }
    return [element];
};
exports.default = objectToArray;
//# sourceMappingURL=objectToArray.js.map