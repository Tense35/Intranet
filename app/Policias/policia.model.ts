//#region Importaciones
import { DataTypes } from "sequelize";
import db from "../../config/db.config"; 
import { IPoliciaTableInstance, IPoliciaViewInstance } from "./policia.interface";
//#endregion

export const TBL_PoliciaModel = db.define<IPoliciaTableInstance>('Policia', {
    PK_policia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    FK_rango: {
        type: DataTypes.INTEGER,
        validate: {
            notEmpty: true
        }
    },
    nombre: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    pass: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    imagen: {
        type: DataTypes.STRING
    },
    ingreso: {
        type: DataTypes.NOW
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

TBL_PoliciaModel.addHook('beforeCreate', ( policia: IPoliciaTableInstance ) => {
    policia.nombre = policia.nombre.toLowerCase();
    policia.email = policia.email.toLowerCase();
});

export const VW_PoliciaModel = db.define<IPoliciaViewInstance>('VW_Policia', 
{
    id_policia: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_rango: {
        type: DataTypes.INTEGER,
    },
    nombre_policia: {
        type: DataTypes.STRING,
    },
    nombre_rango: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    imagen_policia: {
        type: DataTypes.STRING
    },
    imagen_rango: {
        type: DataTypes.STRING
    },
    ingreso: {
        type: DataTypes.NOW
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
