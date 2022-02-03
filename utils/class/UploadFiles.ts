const cloudinary = require('cloudinary').v2;
import { IFile } from "../../models/interfaces/File";
import Tables from "../enums/Tables";
import Log from "./Logs";

cloudinary.config( process.env.CLOUDINARY_URL );
const log = new Log("UploadFiles");

/**
* Se encarga de la verificación y carga de archivos
*/
class UploadFiles {

    private table: string;
    private defaultImage = 'https://res.cloudinary.com/sheriff/image/upload/v1643773896/error.jpg';

    /**
    * Establece la carpeta donde se almacenarán los archivos enviados.
    * @param {Tables} table     Identificador de la tabla donde se realizará la inserción del archivo.
    */
    constructor( table: Tables ) {
        this.table = (Tables[table]).toLocaleLowerCase();
    }

    /**
    * Permite obtener la extensión de un archivo específico
    * @param {File} file        Archivo que se subirá a Cloudinary.
    * @return {string}          Retorna la extensión del archivo específico.
    */
    public getExtension( file: IFile ): string {
        const extension = file.name.split('.');
        return extension[ extension.length-1 ];
    }

    /**
    * Permite cargar archivos hacia Cloudinary
    * @param {any} file                 Archivo que se subirá a Cloudinary.
    * @param {string[]} validExtensions Extensiones permitidas para el archivo enviado.
    * @return {Promise<string>}         Retorna la Url donde se alojó el archivo.
    */
    public async upload( file: any, validExtensions = ['png', 'jpg', 'jpeg']) {
        let url: string = 'Empty';
        try {
            const { tempFilePath } = file.imagen;
            const { secure_url } = await cloudinary.uploader.upload( tempFilePath, { folder: this.table } );
            
            url = ( secure_url )? secure_url : this.defaultImage;

            return new Promise( (resolve, reject) => {
                console.log(file);
                const { imagen } = file;
                const extension = this.getExtension( imagen );

                ( !validExtensions.includes( extension )) 
                ? reject(`La extensión ${ extension }, no es una extensión válida, ${ validExtensions }`)
                : resolve( url );
            });

        }
        catch ( error: unknown ) {
            log.Error(error, 'uploadFile', 'Error al subir el archivo');
            return this.defaultImage;
        }
    }

    /**
    * Permite actualizar los archivos que ya están cargados en Cloudinary
    * @param {any} file                 Archivo que se subirá a Cloudinary.
    * @param {string} urlFile           Url actual del archivo que será actualizado.
    * @param {string[]} validExtensions Extensiones permitidas para el archivo enviado.
    * @return {Promise<string>}         Retorna la Url donde se alojó el archivo.
    */
    public async update( file: any, urlFile: string, validExtensions = ['png', 'jpg', 'jpeg']) {
        try {

            if (urlFile !== this.defaultImage) {
                const fraccionar = urlFile.split('/');
                const idImagen = fraccionar[ fraccionar.length - 1 ];
                const [ public_id ] = idImagen.split('.');
                await cloudinary.uploader.destroy( `${this.table}/${public_id}`, { folder: this.table } );
            }

            return await this.upload( file, validExtensions );
        } 
        catch ( error: unknown ) {
            log.Error(error, 'actualizarArchivo', 'Error al actualizar el archivo');
            return this.defaultImage;
        }
    }

}

export default UploadFiles;
