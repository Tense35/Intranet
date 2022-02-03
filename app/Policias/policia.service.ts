//#region Importaciones
import { Order } from "sequelize/dist";
import Actions from "../../utils/enums/Actions";
import Auditoria from "../../utils/class/Auditoria";
import { IDeleteRequest, IGetRequest, IPostRequest, IPutRequest } from "../../models/interfaces/ServiceRequest";
import { IPoliciaQuery } from "./policia.interface";
import Security from "../../utils/class/Security";
import { stringToBoolean } from "../../utils/functions/stringToBoolean";
import Tables from "../../utils/enums/Tables";
import { TBL_PoliciaModel, VW_PoliciaModel } from "./policia.model";
import UploadFiles from "../../utils/class/UploadFiles";
//#endregion

/** Servicio para la interacción de la base de datos con la tabla Policia. */
class PoliciaService {

    private auditoria: Auditoria = new Auditoria();
    private order: Order = [['id_rango', 'ASC']];
    private security = new Security();
    private uploadFiles = new UploadFiles(Tables.Policia);

    /**
    * Retorna todos los policías de la base de datos que coincidan con la consulta solicitada.
    * @param {IGetRequest} request      Objeto con la data enviada de la solicitud. 
    * @return {IPoliciaViewInstance[]}    Lista de policías retornados por la vista.
    */
    public async getPolicias( request: IGetRequest | any = {} ) {
        const { limit = 40, offset = 0, ...where } = this.verifyQuery(request?.query);
        return VW_PoliciaModel.findAndCountAll({ 
            where,
            limit,
            offset,
            order: this.order, 
        });
    }

    /**
    * Retorna un policía específico de la vista de base de datos
    * @param {IGetRequest} request      Objeto con la data enviada de la solicitud. 
    * @return {IPoliciaViewInstance[]}  Policía específico.
    */
    public async getPolicia( request: IGetRequest | any = {} ) {
        const { limit = 40, offset = 0, ...where } = this.verifyQuery(request?.query);
        where['id_policia'] = request?.params;
        return VW_PoliciaModel.findAndCountAll({ 
            where,
            limit,
            offset,
            order: this.order, 
        });
    }

    /**
    * Actualiza la información de un policía específico
    * @param {IPutRequest} request      Objeto con la data enviada de la solicitud. 
    * @return {IPoliciaViewInstance[]}  Policía específico retornado por la tabla.
    */
    public async putPolicia( request: IPutRequest | any = {} ) {
        const { body, params, files, query } = request;

        const { data } = await this.policiaExistente(params.id_policia);
        if ( files ) {
            body.imagen = (data.imagen)
            ? await this.uploadFiles.update(files, data.imagen)
            : await this.uploadFiles.upload(files);
        }
        if ( body.id_rango ) body['PK_rango'] = body.id_rango;
        if ( body.pass ) body['pass'] = this.security.Encrypt(body.pass);

        const update = await data?.update(body) || null;

        if (update) {
            this.auditoria.InsertarAuditoria(Tables.Policia, Number(1), Actions.Update);
            return this.getPolicias(this.verifyQuery(query));
        }
        return null;
    }

    /**
    * Crea un nuevo policía en la base de datos.
    * @param {IPostRequest} request     Objeto con la data enviada de la solicitud. 
    * @return {IPoliciaViewInstance[]}  Policía específico retornado por la tabla.
    */
    public async postPolicia( request: IPostRequest | any = {} ) { 
        const { body, params, files, query } = request;

        if ( files ) {
            const imgUrl = await this.uploadFiles.upload( files );
            if ( imgUrl ) body.imagen = imgUrl;
        }

        body['PK_policia'] = body.id_policia;
        body['PK_rango'] = body.id_rango;
        body['pass'] = this.security.Encrypt(body.pass);
        const data = await TBL_PoliciaModel.create(body) || null;

        if (data) {
            this.auditoria.InsertarAuditoria(Tables.Policia, Number(1), Actions.Insert);
            return this.getPolicias(this.verifyQuery(query));
        }
        return null;
    }

    /**
    * Realiza un borrado lógico en la base de datos del policía especificado.
    * @param {IDeleteRequest} request   Objeto con la data enviada de la solicitud.
    * @return {IPoliciaViewInstance[]}  Policía específico retornado por la tabla.
    */
    public async deletePolicia( request: IDeleteRequest | any = {} ) { 
        const { params } = request;

        const policia = await this.putPolicia(request);

        if (policia) {
            this.auditoria.InsertarAuditoria(Tables.Policia, Number(params.id_jwt), Actions.Delete);
            return policia;
        }
        return null;
    }

    /**
    * Retorna un objeto con los queryParameters enviados, convertidos en su respectivo tipo de dato.
    * @param {object} queryParams   Objeto con los query parameters enviados al API.
    * @return {object}              Objeto con los parámetros de consulta convertidos a su tipo de dato.
    */
    private verifyQuery = ( queryParams: object | any ): IPoliciaQuery => {
        try {
            const allowedParameters = {
                all: ['id_policia', 'id_rango', 'nombre_policia', 'nombre_rango', 'email', 'imagen_policia', 'imagen_rango', 'ingreso', 'estado', 'limit', 'offset'],
                boolean: ['estado'],
                number: ['id_policia', 'id_rango', 'limit', 'offset']
            }

            let where: { [char: string]: IPoliciaQuery } = {};
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
    * Retorna un policía específico de la tabla de base de datos
    * @param {number} id_policia          Identificador del policía que se desea buscar
    * @return {IPoliciaTableInstance[]}   Policía específico retornado por la tabla
    */
    public async getPoliciaTabla( id_policia: number | string ) {

        const where = ((typeof id_policia) === 'number')
        ? { PK_policia: id_policia }
        : { email: id_policia }

        return TBL_PoliciaModel.findAndCountAll({ 
            where
        });
    }

    /**
    * Verifica si existe un policía con un identificador específico
    * @param {number} id_policia          Identificador del policía que se desea verificar
    * @return {IPoliciaTableInstance[]}   Policía específico retornado por la tabla
    */
    public async policiaExistente( id_policia: number | string ) {
        const { rows: data, count: total } = await this.getPoliciaTabla(id_policia);

        return ( total < 1 )
        ? { exist: false, data: data[0] }
        : { exist: true, data: data[0] };
    }
}

export default PoliciaService;