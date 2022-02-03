//#region Importaciones
import { Order } from "sequelize/dist";
import Actions from "../../utils/enums/Actions";
import Auditoria from "../../utils/class/Auditoria";
import { IDeleteRequest, IGetRequest, IPostRequest, IPutRequest } from "../../models/interfaces/ServiceRequest";
import { IRangoQuery } from "./rango.interface";
import { stringToBoolean } from "../../utils/functions/stringToBoolean";
import Tables from "../../utils/enums/Tables";
import UploadFiles from "../../utils/class/UploadFiles";
import { VW_RangoModel, TBL_RangoModel } from "./rango.model";
//#endregion

/** Servicio para la interacción de la base de datos con la tabla Rango. */
class RangoService {

    private auditoria: Auditoria = new Auditoria();
    private order: Order = [['id_rango', 'ASC']];
    private uploadFiles = new UploadFiles(Tables.Rango);

    /**
    * Retorna todos los rangos de la base de datos que coincidan con la consulta solicitada.
    * @param {IGetRequest} request      Objeto con la data enviada de la solicitud. 
    * @return {IRangoViewInstance[]}    Lista de rangos retornados por la vista.
    */
    public async getRangos( request: IGetRequest | any = {} ) {
        const { limit = 40, offset = 0, ...where } = this.verifyQuery(request?.query);
        return VW_RangoModel.findAndCountAll({ 
            where,
            limit,
            offset,
            order: this.order, 
        });
    }

    /**
    * Retorna un rango específico de la vista de base de datos
    * @param {IGetRequest} request      Objeto con la data enviada de la solicitud. 
    * @return {IRangoViewInstance[]}    Rango específico.
    */
    public async getRango( request: IGetRequest | any = {} ) {
        const { limit = 40, offset = 0, ...where } = this.verifyQuery(request?.query);
        where['id_rango'] = request?.params.id_rango;
        return VW_RangoModel.findAndCountAll({ 
            where,
            limit,
            offset,
            order: this.order, 
        });
    }

    /**
    * Actualiza la información de un rango específico
    * @param {IPutRequest} request      Objeto con la data enviada de la solicitud. 
    * @return {IRangoViewInstance[]}    Rango específico retornado por la tabla.
    */
    public async putRango( request: IPutRequest | any = {} ) {
        const { body, params, files, query } = request;

        const { data } = await this.rangoExistente(params.id_rango);
        if ( files ) {
            body.imagen = (data.imagen)
            ? await this.uploadFiles.update(files, data.imagen)
            : await this.uploadFiles.upload(files);
        }

        const update = await data?.update(body) || null;

        if (update) {
            this.auditoria.InsertarAuditoria(Tables.Rango, Number(1), params.id_rango, Actions.Update);
            return this.getRangos(this.verifyQuery(query));
        }
        return null;
    }

    /**
    * Crea un nuevo rango en la base de datos.
    * @param {IPostRequest} request     Objeto con la data enviada de la solicitud. 
    * @return {IRangoViewInstance[]}    Rango específico retornado por la tabla.
    */
    public async postRango( request: IPostRequest | any = {} ) { 
        const { body, params, files, query } = request;

        if ( files ) {
            const imgUrl = await this.uploadFiles.upload( files );
            if ( imgUrl ) body.imagen = imgUrl;
        }

        body['PK_rango'] = body.id_rango;
        const data = await TBL_RangoModel.create(body) || null;

        if (data) {
            this.auditoria.InsertarAuditoria(Tables.Rango, Number(1), body.id_rango, Actions.Insert);
            return this.getRangos(this.verifyQuery(query));
        }
        return null;
    }

    /**
    * Realiza un borrado lógico en la base de datos del rango especificado.
    * @param {IDeleteRequest} request   Objeto con la data enviada de la solicitud.
    * @return {IRangoViewInstance[]}    Rango específico retornado por la tabla.
    */
    public async deleteRango( request: IDeleteRequest | any = {} ) { 
        const { params } = request;

        const rango = await this.putRango(request);

        if (rango) {
            this.auditoria.InsertarAuditoria(Tables.Rango, Number(params.id_jwt), params.id_rango, Actions.Delete);
            return rango;
        }
        return null;
    }

    /**
    * Retorna un objeto con los queryParameters enviados, convertidos en su respectivo tipo de dato.
    * @param {object} queryParams   Objeto con los query parameters enviados al API.
    * @return {object}              Objeto con los parámetros de consulta convertidos a su tipo de dato.
    */
    private verifyQuery = ( queryParams: object | any ): IRangoQuery => {
        try {
            const allowedParameters = {
                all: ['id_rango', 'cantidad_policias', 'nombre_rango', 'id_rango', 'estado', 'imagen', 'limit', 'offset'],
                boolean: ['estado'],
                number: ['id_rango', 'cantidad_policias', 'limit', 'offset']
            }

            let where: { [char: string]: IRangoQuery } = {};
            for( const param in queryParams ) {
                const parameter = param.toLowerCase().trim();

                if ( allowedParameters.all.includes(parameter) && parameter != null && parameter != undefined ) {
                    if ( allowedParameters.boolean.includes(parameter) ) queryParams[ param ] = stringToBoolean(queryParams[ param ]);
                    if ( allowedParameters.number.includes(parameter) ) queryParams[ param ] = Number(queryParams[ param ]);

                    where[param] = queryParams[param];
                }
            }
            return where;

        } catch ( err: unknown) {
            return {}
        }
    }

    /**
    * Retorna un rango específico de la tabla de base de datos
    * @param {number} id_rango          Identificador del rango que se desea buscar
    * @return {IRangoTableInstance[]}   Rango específico retornado por la tabla
    */
    public async getRangoTabla( id_rango: number ) {
        return TBL_RangoModel.findAndCountAll({ 
            where: { PK_rango: id_rango } 
        });
    }

    /**
    * Verifica si existe un rango con un identificador específico
    * @param {number} id_rango          Identificador del rango que se desea verificar
    * @return {IRangoTableInstance[]}   Rango específico retornado por la tabla
    */
    public async rangoExistente( id_rango: number ) {
        const { rows: data, count: total } = await this.getRangoTabla(id_rango);

        return ( total < 1 || data[0]?.nombre === 'Administrador' )
        ? { exist: false, data: data[0] }
        : { exist: true, data: data[0] };
    }
}

export default RangoService;