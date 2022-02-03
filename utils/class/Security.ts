import bcrypt from "bcryptjs";

/** Clase para temas relacionados a encriptación de datos. */
class Security {

    private salt = bcrypt.genSaltSync();

    /**
    * Permite encriptar un dato
    * @param {string} data      Dato que se desea encriptar.
    * @return {string}          Dato encriptado.
    */
    public async Encrypt( data: string ) {
        return bcrypt.hashSync( data, this.salt );
    }

    /**
    * Permite comparar si un dato no encriptado es equivalente a un dato encriptado.
    * @param {string} data      Dato que se desea encriptar.
    * @param {string} password  Identificador del rango que se desea buscar.
    * @return {boolean}         Resultado de la verificación.
    */
    public async verifyEncrypt( password: string, encryptedData: string ): Promise<boolean> {
        return bcrypt.compareSync( password, encryptedData );
    }

}

export default Security;