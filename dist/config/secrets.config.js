"use strict";
class Secrets {
    constructor() {
        this.database = process.env.MSSQL_DBName || 'Intranet';
        this.user = process.env.MSSQL_User || 'asd';
        this.password = process.env.MSSQL_Password || '';
        this.port = Number(process.env.MSSQL_Port) || 202;
        this.host = process.env.MSSQL_Host || 'localhost';
    }
    getDatabase() {
        return this.database;
    }
}
//# sourceMappingURL=secrets.config.js.map