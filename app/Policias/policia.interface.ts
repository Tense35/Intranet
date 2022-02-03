import { Model, Optional } from "sequelize";

/** Interface de elementos existentes en la tabla de la base de datos. */
export interface IPoliciaAttributes {
    PK_policia: number,
	FK_rango: number,
	nombre: string,
	email: string,
    pass: string,
	imagen?: string,
	ingreso?: Date, 
    estado?: boolean
}

/** Interface de elementos que serán retornados al usuario. */
export interface IPoliciaOutput {
    id_policia: number, 
	id_rango: number, 
	nombre_policia: string, 
	nombre_rango: string, 
	email: string, 
	imagen_policia: string, 
	imagen_rango: string,
	ingreso: Date, 
	estado: boolean,
}

/** Interface de elementos con los posibles parámetros de consulta */
export interface IPoliciaQuery extends Optional<IPoliciaOutput, "id_policia" | "id_rango" | "nombre_policia" | "nombre_rango" | "email" | "imagen_policia" | "imagen_rango" | "ingreso" | "estado"> {
    limit?: number;
    offset?: number;
}

/** Interface de elementos para la inserción en la base de datos con sus parámetros opcionales */
export interface IPoliciaCreationAtributes extends Optional<IPoliciaAttributes, "imagen" | "estado" | "ingreso"> {}

/** Interface de elementos retornados por la base de datos para la tabla */
export interface IPoliciaTableInstance extends Model<IPoliciaAttributes, IPoliciaCreationAtributes>, IPoliciaAttributes {}
/** Interface de elementos retornados por la base de datos para la vista */
export interface IPoliciaViewInstance extends Model<IPoliciaOutput, IPoliciaOutput>, IPoliciaOutput {}