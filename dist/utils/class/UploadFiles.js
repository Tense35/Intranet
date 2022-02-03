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
const cloudinary = require('cloudinary').v2;
const Tables_1 = __importDefault(require("../enums/Tables"));
const Logs_1 = __importDefault(require("./Logs"));
cloudinary.config(process.env.CLOUDINARY_URL);
const log = new Logs_1.default("UploadFiles");
const defaultImage = 'https://res.cloudinary.com/sheriff/image/upload/v1643773896/error.jpg';
/**
* Se encarga de la verificación y carga de archivos
*/
class UploadFiles {
    /**
    * Establece la carpeta donde se almacenarán los archivos enviados.
    * @param {Tables} table     Identificador de la tabla donde se realizará la inserción del archivo.
    */
    constructor(table) {
        this.table = table;
    }
    /**
    * Permite obtener la extensión de un archivo específico
    * @param {File} file        Archivo que se subirá a Cloudinary.
    * @return {string}          Retorna la extensión del archivo específico.
    */
    getExtension(file) {
        const extension = file.name.split('.');
        return extension[extension.length - 1];
    }
    /**
    * Permite cargar archivos hacia Cloudinary
    * @param {any} file                 Archivo que se subirá a Cloudinary.
    * @param {string[]} validExtensions Extensiones permitidas para el archivo enviado.
    * @return {Promise<string>}         Retorna la Url donde se alojó el archivo.
    */
    upload(file, validExtensions = ['png', 'jpg', 'jpeg']) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = 'Empty';
            try {
                const { tempFilePath } = file.imagen;
                const { secure_url } = yield cloudinary.uploader.upload(tempFilePath, { folder: Tables_1.default[this.table] });
                url = (secure_url) ? secure_url : defaultImage;
                return new Promise((resolve, reject) => {
                    console.log(file);
                    const { imagen } = file;
                    const extension = this.getExtension(imagen);
                    (!validExtensions.includes(extension))
                        ? reject(`La extensión ${extension}, no es una extensión válida, ${validExtensions}`)
                        : resolve(url);
                });
            }
            catch (err) {
                log.Error(err, 'uploadFile', 'Error al subir el archivo');
                return defaultImage;
            }
        });
    }
    /**
    * Permite actualizar los archivos que ya están cargados en Cloudinary
    * @param {any} file                 Archivo que se subirá a Cloudinary.
    * @param {string} urlFile           Url actual del archivo que será actualizado.
    * @param {string[]} validExtensions Extensiones permitidas para el archivo enviado.
    * @return {Promise<string>}         Retorna la Url donde se alojó el archivo.
    */
    update(file, urlFile, validExtensions = ['png', 'jpg', 'jpeg']) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (urlFile !== defaultImage) {
                    const fraccionar = urlFile.split('/');
                    const idImagen = fraccionar[fraccionar.length - 1];
                    const [public_id] = idImagen.split('.');
                    console.log(public_id);
                    yield cloudinary.uploader.destroy(`${Tables_1.default[this.table]}/${public_id}`, { folder: Tables_1.default[this.table] });
                }
                return yield this.upload(file, validExtensions);
            }
            catch (err) {
                log.Error(err, 'actualizarArchivo', 'Error al actualizar el archivo');
                return defaultImage;
            }
        });
    }
}
exports.default = UploadFiles;
//# sourceMappingURL=UploadFiles.js.map