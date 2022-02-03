"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VW_PoliciaModel = exports.TBL_PoliciaModel = void 0;
//#region Importaciones
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../../config/db.config"));
//#endregion
exports.TBL_PoliciaModel = db_config_1.default.define('Policia', {
    PK_policia: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    FK_rango: {
        type: sequelize_1.DataTypes.INTEGER,
        validate: {
            notEmpty: true
        }
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    pass: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING
    },
    ingreso: {
        type: sequelize_1.DataTypes.NOW
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
exports.TBL_PoliciaModel.addHook('beforeCreate', (policia) => {
    policia.nombre = policia.nombre.toLowerCase();
    policia.email = policia.email.toLowerCase();
});
exports.VW_PoliciaModel = db_config_1.default.define('VW_Policia', {
    id_policia: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    id_rango: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    nombre_policia: {
        type: sequelize_1.DataTypes.STRING,
    },
    nombre_rango: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    imagen_policia: {
        type: sequelize_1.DataTypes.STRING
    },
    imagen_rango: {
        type: sequelize_1.DataTypes.STRING
    },
    ingreso: {
        type: sequelize_1.DataTypes.NOW
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
//# sourceMappingURL=policia.model.js.map