enum Tables {

    /**
     * Contiene la información de las diferentes tablas de la base de datos
    */
    Tabla = 1,

    /**
     * Contiene los policías y su información
    */
    Policia = 2,

    /**
     * Contiene los rangos policiales y el administrativo
    */
    Rango = 3,

    /**
     * Tabla de movimiento, en ella se almacenan los identificadores de los policías y el identificador de la especialidad asignada
    */
    Especialidad_Policia = 4,

    /**
     * Especialidades de los policías
    */
    Especialidad = 5,

    /**
     * Delitos
    */
    Delito_Categoria = 6,

    /**
     * Categorías de los delitos
    */
    Delito_Subcategoria = 7,

    /**
     * Especialidades de los policías
    */
    Civil = 8,

    /**
     * Registro de antecedentes de un civil
    */
    Antecedente = 9,

    /**
     * Delitos cometidos por un civil, asignados a un antecedente específico
    */
    Antecedente_Delito = 10,

    /**
     * Registro de sanciones aplicadas a policías
    */
    Sancion = 11,

    /**
     * Módulos del frontend
    */
    Modulo = 12,

    /**
     * Contiene los registros de inserción, actualización y eliminación realizados a nivel de base de datos
    */
    Auditoria = 13,

    /**
     * Acción ejecutada a nivel de base de datos, (Insert, Update, Delete, Function)
    */
    Accion = 14,

    /**
     * Contiene los códigos asociados a las recuperaciones de contraseña y si fue usado o no
    */
    Recuperar_Password = 15
}

export default Tables;