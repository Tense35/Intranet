"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../../config/db.config"));
// Param1: Nombre del modelo | Param2: Atributos | Param3: Confgs
const RangoModel = db_config_1.default.define('Rangos', {
    PK_rango: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = RangoModel;
//# sourceMappingURL=rango.model.js.map