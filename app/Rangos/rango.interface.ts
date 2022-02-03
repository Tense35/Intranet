import { Model, Optional } from "sequelize";

/** Interface de elementos existentes en la tabla de la base de datos. */
export interface IRangoAttributes {
    PK_rango: number;
    nombre: string;
    imagen?: string;
    estado?: boolean;
}

/** Interface de elementos que serán retornados al usuario. */
export interface IRangoOutput {
    id_rango: number;
    nombre_rango: string;
    imagen_rango: string;
    cantidad_policias: number;
    estado: boolean;
}

/** Interface de elementos con los posibles parámetros de consulta */
export interface IRangoQuery extends Optional<IRangoOutput, "id_rango" | "nombre_rango" | "imagen_rango" | "cantidad_policias" | "estado"> {
    limit?: number;
    offset?: number;
}


/** Interface de elementos para la inserción en la base de datos con sus parámetros opcionales */
export interface IRangoCreationAtributes extends Optional<IRangoAttributes, "imagen" | "estado"> {}

/** Interface de elementos retornados por la base de datos para la tabla */
export interface IRangoTableInstance extends Model<IRangoAttributes, IRangoCreationAtributes>, IRangoAttributes {}
/** Interface de elementos retornados por la base de datos para la vista */
export interface IRangoViewInstance extends Model<IRangoOutput, IRangoOutput>, IRangoOutput {}