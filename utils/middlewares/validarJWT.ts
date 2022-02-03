// //#region Importaciones
// import { Request, Response } from "express";
// import jwt from 'jsonwebtoken';
// import SendResponse from "../class/SendResponse";
// //#endregion

// const validarJWT = async( req:Request, res:Response, next: any ) => 
// {
//     const key = process.env.JWT_KEY || "Error";
//     const sendResponse = new SendResponse('validarJWT - Middleware');
//     const token = req.header('x-token');

//     if( !token ) return sendResponse.UnauthorizedResponse(res, 'No hay token en la petición');

//     try {
//         const { id_policia, email, id_rango } = jwt.verify( token, key );

//         // Leer el usuario que corresponde al email del token
//         const usuario = await Usuario.findByPk( email );

//         // Verificar que el usuario no esté vacío

//         if ( !usuario || !usuario.estado ) return sendResponse.UnauthorizedResponse(res, 'Token no válido, el usuario no existe en la base de datos.');

//         // @ts-ignore
//         req.usuario = usuario;

//         next();
//     } 
//     catch ( error ) {
//         return sendResponse.UnauthorizedResponse(res, 'Token inválido');
//     }
// }

// export default validarJWT;