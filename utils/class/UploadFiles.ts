const cloudinary = require('cloudinary').v2;
import { IFile } from "../../models/interfaces/File";
import Tables from "../enums/Tables";
import Log from "./Logs";

cloudinary.config( process.env.CLOUDINARY_URL );
const log = new Log("UploadFiles");
const defaultImage = 'https://res.cloudinary.com/sheriff/image/upload/v1643773896/error.jpg';

/**
* Se encarga de la verificación y carga de archivos
*/
class UploadFiles {

    private table: Tables;

    /**
    * Establece la carpeta donde se almacenarán los archivos enviados.
    * @param {Tables} table     Identificador de la tabla donde se realizará la inserción del archivo.
    */
    constructor( table: Tables ) {
        this.table = table;
    }

    /**
    * Permite obtener la extensión de un archivo específico
    * @param {File} file        Archivo que se subirá a Cloudinary.
    * @return {string}          Retorna la extensión del archivo específico.
    */
    getExtension( file: IFile ): string {
        const extension = file.name.split('.');
        return extension[ extension.length-1 ];
    }

    /**
    * Permite cargar archivos hacia Cloudinary
    * @param {any} file                 Archivo que se subirá a Cloudinary.
    * @param {string[]} validExtensions Extensiones permitidas para el archivo enviado.
    * @return {Promise<string>}         Retorna la Url donde se alojó el archivo.
    */
    async upload( file: any, validExtensions = ['png', 'jpg', 'jpeg']) {
        let url: string = 'Empty';
        try {
            const { tempFilePath } = file.imagen;
            const { secure_url } = await cloudinary.uploader.upload( tempFilePath, { folder: Tables[this.table] } );
            
            url = ( secure_url )? secure_url : defaultImage;

            return new Promise( (resolve, reject) => {
                console.log(file);
                const { imagen } = file;
                const extension = this.getExtension( imagen );

                ( !validExtensions.includes( extension )) 
                ? reject(`La extensión ${ extension }, no es una extensión válida, ${ validExtensions }`)
                : resolve( url );
            });

        }
        catch ( err ) {
            log.Error(err, 'uploadFile', 'Error al subir el archivo');
            return defaultImage;
        }
    }

    /**
    * Permite actualizar los archivos que ya están cargados en Cloudinary
    * @param {any} file                 Archivo que se subirá a Cloudinary.
    * @param {string} urlFile           Url actual del archivo que será actualizado.
    * @param {string[]} validExtensions Extensiones permitidas para el archivo enviado.
    * @return {Promise<string>}         Retorna la Url donde se alojó el archivo.
    */
    async update( file: any, urlFile: string, validExtensions = ['png', 'jpg', 'jpeg']) {
        try 
        {

            if (urlFile !== defaultImage) {
                const fraccionar = urlFile.split('/');
                const idImagen = fraccionar[ fraccionar.length - 1 ];
                const [ public_id ] = idImagen.split('.');
                console.log(public_id);
                await cloudinary.uploader.destroy( `${Tables[this.table]}/${public_id}`, { folder: Tables[this.table] } );
            }

            return await this.upload( file, validExtensions );
        } 
        catch (err) {
            log.Error(err, 'actualizarArchivo', 'Error al actualizar el archivo');
            return defaultImage;
        }
    }

}

export default UploadFiles;
