//#region Importaciones
import cors from "cors";
import db from "./db.config";
import express, { Application } from "express";
import fileUpload from "express-fileupload";
import IRoutes from "../models/interfaces/Routes";
import Logs from "../utils/class/Logs";
import routes from "../app/routes";
//#endregion

class Server {
    private app: Application;
    private port: string;
    private logs = new Logs('server.config');

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8081';
        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    // Establecer conexión con la base de datos
    async dbConnection(): Promise<void> {
        try {
            await db.authenticate();
            this.logs.Info('Database online', 'dbConnection');
        } 
        catch (ex: unknown) {
            this.logs.Error(ex, 'Error al conectar la base de datos');
            const exception = ex as ErrorEvent;
            throw new Error( exception.message );
        }
    }

    middlewares(): void {
        // Cors
        this.app.use( cors() );

        // Lectura del body - Permite leer el body de las peticiones rest
        this.app.use( express.json() );

        // Carpeta pública - Carpeta inicial en el navegador
        this.app.use( express.static('public'));

        // Permitir subir archivo mediante el API REST
        this.app.use (
            fileUpload ({
                useTempFiles : true,
                tempFileDir : '/tmp/'
            })
        );
    }

    //Definición de rutas
    routes(): void {
        routes.forEach( (route: IRoutes) => {
            this.app.use( `/api/${route.path}`, route.router );
        });
    }

    // Levantar el servidor
    listen(): void {
        this.app.listen( this.port, () => {
            console.clear();
            this.logs.Info(`Servidor corriendo en puerto ${this.port}`, 'listen');
        });
    }
}

export default Server;