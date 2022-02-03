"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tables;
(function (Tables) {
    /**
     * Contiene la información de las diferentes tablas de la base de datos
    */
    Tables[Tables["Tabla"] = 1] = "Tabla";
    /**
     * Contiene los policías y su información
    */
    Tables[Tables["Policia"] = 2] = "Policia";
    /**
     * Contiene los rangos policiales y el administrativo
    */
    Tables[Tables["Rango"] = 3] = "Rango";
    /**
     * Tabla de movimiento, en ella se almacenan los identificadores de los policías y el identificador de la especialidad asignada
    */
    Tables[Tables["Especialidad_Policia"] = 4] = "Especialidad_Policia";
    /**
     * Especialidades de los policías
    */
    Tables[Tables["Especialidad"] = 5] = "Especialidad";
    /**
     * Delitos
    */
    Tables[Tables["Delito_Categoria"] = 6] = "Delito_Categoria";
    /**
     * Categorías de los delitos
    */
    Tables[Tables["Delito_Subcategoria"] = 7] = "Delito_Subcategoria";
    /**
     * Especialidades de los policías
    */
    Tables[Tables["Civil"] = 8] = "Civil";
    /**
     * Registro de antecedentes de un civil
    */
    Tables[Tables["Antecedente"] = 9] = "Antecedente";
    /**
     * Delitos cometidos por un civil, asignados a un antecedente específico
    */
    Tables[Tables["Antecedente_Delito"] = 10] = "Antecedente_Delito";
    /**
     * Registro de sanciones aplicadas a policías
    */
    Tables[Tables["Sancion"] = 11] = "Sancion";
    /**
     * Módulos del frontend
    */
    Tables[Tables["Modulo"] = 12] = "Modulo";
    /**
     * Contiene los registros de inserción, actualización y eliminación realizados a nivel de base de datos
    */
    Tables[Tables["Auditoria"] = 13] = "Auditoria";
    /**
     * Acción ejecutada a nivel de base de datos, (Insert, Update, Delete, Function)
    */
    Tables[Tables["Accion"] = 14] = "Accion";
    /**
     * Contiene los códigos asociados a las recuperaciones de contraseña y si fue usado o no
    */
    Tables[Tables["Recuperar_Password"] = 15] = "Recuperar_Password";
})(Tables || (Tables = {}));
exports.default = Tables;
//# sourceMappingURL=Tables.js.map