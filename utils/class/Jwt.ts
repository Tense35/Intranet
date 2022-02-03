//#region Importaciones
import jwt from 'jsonwebtoken';
import Logs from './Logs';
//#endregion

/** Clase para interacciones relacionadas con el json web token.*/
class Jwt {

    private log = new Logs('Jwt');

    /**
    * Inserta información en la tabla de Auditoría para logs de trazabilidad
    * @param {string} id            Identificador del policía propietario del token
    * @param {string} email         Email del policía propietario del token
    * @param {number} rango         Identificador del rango del policía propietario del token
    * @param {number} time          Tiempo en horas para la expiración del token. Por defecto tiene una duración de 24 hora, para tokens sin expiración deberá enviarse 0
    * @return {Promise<string>}     Retorna el token o un mensaje de error
    */
    public async Generate( id: string = '', email: string = '', rango: number = 1, time: number = 24 ) {
        return new Promise(( resolve, reject ) => {
            const payload = { id, email, rango };
            const expiresIn = ( time != 0 )
            ? (time.toString() + 'h')
            : ('5y');
    
            jwt.sign( payload, process.env.JWT_KEY || '', { expiresIn }, ( err, token ) => {
                if (err) {
                    this.log.Error(err, 'Generate', 'No se pudo generar el token');
                    reject( 'No se pudo generar el token' );
                }
                else resolve( token );
            });
    
        });
    }
}

export default Jwt;