"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//#region Importaciones
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//#endregion
//#region Variables de entorno
const database = process.env.MSSQL_DBName || 'Intranet';
const user = process.env.MSSQL_User || 'asd';
const password = process.env.MSSQL_Password || '';
const port = process.env.MSSQL_Port || 202;
const host = process.env.MSSQL_Host || 'localhost';
//#endregion
const db = new sequelize_1.Sequelize(database, user, password, {
    host,
    port: Number(port),
    dialect: 'mssql',
    //logging: false
});
//logging: Si está en false, dejará de mostrar las consultas que haga a la db en la consola
exports.default = db;
//# sourceMappingURL=db.config.js.map