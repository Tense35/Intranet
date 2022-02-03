"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VW_RangoModel = exports.TBL_RangoModel = void 0;
//#region Importaciones
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../../config/db.config"));
//#endregion
exports.TBL_RangoModel = db_config_1.default.define('Rango', {
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
    updatedAt: false,
    freezeTableName: true
});
exports.TBL_RangoModel.addHook('beforeCreate', (rango) => {
    rango.nombre = rango.nombre.toLowerCase();
});
exports.VW_RangoModel = db_config_1.default.define('VW_Rango', {
    id_rango: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    nombre_rango: {
        type: sequelize_1.DataTypes.STRING,
    },
    imagen_rango: {
        type: sequelize_1.DataTypes.STRING
    },
    cantidad_policias: {
        type: sequelize_1.DataTypes.INTEGER
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
    }
}, {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});
//# sourceMappingURL=rango.model.js.map