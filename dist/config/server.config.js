"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//#region Importaciones
const cors_1 = __importDefault(require("cors"));
const db_config_1 = __importDefault(require("./db.config"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const Logs_1 = __importDefault(require("../utils/class/Logs"));
const routes_1 = __importDefault(require("../app/routes"));
//#endregion
class Server {
    constructor() {
        this.logs = new Logs_1.default('server.config');
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8081';
        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    // Establecer conexión con la base de datos
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_config_1.default.authenticate();
                this.logs.Info('Database online', 'dbConnection');
            }
            catch (ex) {
                this.logs.Error(ex, 'Error al conectar la base de datos');
                const exception = ex;
                throw new Error(exception.message);
            }
        });
    }
    middlewares() {
        // Cors
        this.app.use((0, cors_1.default)());
        // Lectura del body - Permite leer el body de las peticiones rest
        this.app.use(express_1.default.json());
        // Carpeta pública - Carpeta inicial en el navegador
        this.app.use(express_1.default.static('public'));
        // Permitir subir archivo mediante el API REST
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }));
    }
    //Definición de rutas
    routes() {
        routes_1.default.forEach((route) => {
            this.app.use(`/api/${route.path}`, route.router);
        });
    }
    // Levantar el servidor
    listen() {
        this.app.listen(this.port, () => {
            console.clear();
            this.logs.Info(`Servidor corriendo en puerto ${this.port}`, 'listen');
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.config.js.map