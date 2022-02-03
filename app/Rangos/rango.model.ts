//#region Importaciones
import { DataTypes, Sequelize } from 'sequelize';
import { Hooks } from "sequelize/dist/lib/hooks";
import db from "../../config/db.config"; 
import { IRangoTableInstance, IRangoViewInstance } from './rango.interface';
//#endregion

export const TBL_RangoModel = db.define<IRangoTableInstance>('Rango', {
    PK_rango: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    imagen: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});

TBL_RangoModel.addHook('beforeCreate', ( rango: IRangoTableInstance ) => {
    rango.nombre = rango.nombre.toLowerCase();
});

export const VW_RangoModel = db.define<IRangoViewInstance>('VW_Rango', 
{
    id_rango: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre_rango: {
        type: DataTypes.STRING,
    },
    imagen_rango: {
        type: DataTypes.STRING
    },
    cantidad_policias: {
        type: DataTypes.INTEGER
    },
    estado: {
        type: DataTypes.BOOLEAN,
    }
}, {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});
