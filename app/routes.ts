//#region Importación de rutas
import rangoRouter from "./Rangos/rango.route";
import policiaRouter from "./Policias/policia.route";
import Routes from "../models/interfaces/Routes";
//#endregion

export const routes: Routes[] = [
    { path: 'rango', router: rangoRouter },
    { path: 'policia', router: policiaRouter }
];

export default routes;