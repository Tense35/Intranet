//#region Importaciones
import Actions from "../enums/Actions";
import db from "../../config/db.config";
import Log from "./Logs";
import Tables from "../enums/Tables";
//#endregion

/** Clase para mantener la trazabilidad de inserciones, actualizaciones y eliminaciones de la base de datos. */
class Auditoria {

    private log = new Log('Auditoria');

    /**
    * Inserta información en la tabla de Auditoría para logs de trazabilidad
    * @param {Tables} id_tabla Identificador del rango que se desea buscar
    * @param {number} id_policia Identificador del policía que ejecuta la acción en la base de datos
    * @param {Actions} accion Acción que se realiza a nivel de base de datos (Update, Insert, etc..)
    * @return {Promise<Boolean>} Retorna un booleano indicando si la inserción fue correcta o no
    */
    public async InsertarAuditoria(id_tabla: Tables, id_policia: number, accion: Actions): Promise<boolean> {
        db.query('EXEC SP_Auditoria :FK_tabla, :FK_policia, :FK_accion;', { 
            replacements: { FK_tabla: id_tabla, FK_policia: id_policia, FK_accion: accion}
        })
        .then(() => {
            return true;
        })
        .catch(error => {
            this.log.Error(error, 'InsertarAuditoria', 'Error al utilizar el Store Procedure de Auditoría');
            return false;
        });
        return false;
    }
}

export default Auditoria;