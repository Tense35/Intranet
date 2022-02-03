"use strict";
const params = ['nombre', 'estado', 'limit', 'offset'];
const verifyRangoQuery = (queryParams) => {
    try {
        let where = {};
        for (const param in queryParams) {
            if (params.includes(param.toLowerCase()) && param != null && param != undefined) {
                if (param.toLowerCase() == 'estado')
                    queryParams[param] = Boolean(queryParams[param]);
                if (param.toLowerCase() == 'limit')
                    queryParams[param] = Number(queryParams[param]);
                if (param.toLowerCase() == 'offset')
                    queryParams[param] = Number(queryParams[param]);
                Object.defineProperty(where, param.toLowerCase(), queryParams[param]);
            }
        }
        return where;
    }
    catch (error) {
        return {};
    }
};
//# sourceMappingURL=verifyRangoQuery.js.map