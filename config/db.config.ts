//#region Importaciones
import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();
//#endregion

//#region Variables de entorno
const database = process.env.MSSQL_DBName || 'Intranet';
const user = process.env.MSSQL_User || 'asd';
const password = process.env.MSSQL_Password || '';
const port = process.env.MSSQL_Port || 202;
const host = process.env.MSSQL_Host || 'localhost';
//#endregion

const db = new Sequelize(database, user, password, {
    host,
    port: Number(port),
    dialect: 'mssql',
    //logging: false
});

//logging: Si está en false, dejará de mostrar las consultas que haga a la db en la consola

export default db;