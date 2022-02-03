"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Clase para la generación de logs. */
class Log {
    /**
    * Establece el nombre del componente sobre el cual se está trabajando, a fin de generar logs en caso de errores.
    * @param  {string} componente Nombre del componente en el que se está instanciando la clase.
    */
    constructor(componente) {
        this.separator = '--------------------------------------------------------------------------';
        this.componente = '';
        this.componente = componente;
    }
    /**
    * Genera un log de información.
    * @param {string} mensaje           Mensaje que se desea imprimir en el log.
    * @param {string} subcomponente     Nombre de la función o área específica desde donde se llama el método.
    */
    Info(mensaje, subcomponente) {
        console.info(this.separator);
        console.info(`|::| Componente: ${this.componente} ${subcomponente}`);
        console.info(`|::| Mensaje de info: ${mensaje}`);
        console.info(`|::| Fecha: ${new Date()}`);
        console.info(this.separator + '\n');
    }
    /**
    * Genera un log de información.
    * @param {string} exception         Mensaje de la excepción generada por el manejador de errores.
    * @param {string} mensaje           Mensaje opcional de error.
    * @param {string} subcomponente     Nombre de la función o área específica desde donde se llama el método.
    */
    Error(exception, subcomponente, errorMessage) {
        console.error(this.separator);
        console.error(`|::| Componente: ${this.componente} ${subcomponente}`);
        console.error(`|::| Mensaje de error: ${exception}`);
        console.error(`|::| Mensaje de Excepción: ${errorMessage}`);
        console.error(`|::| Fecha: ${new Date()}`);
        console.error(this.separator + '\n');
    }
    /**
    * Genera un log para debugear.
    * @param {string} mensaje           Mensaje que se desea imprimir en el log.
    * @param {string} subcomponente     Nombre de la función o área específica desde donde se llama el método.
    */
    Debug(mensaje, subcomponente) {
        console.debug(this.separator);
        console.debug(`|::| Componente: ${this.componente} ${subcomponente}`);
        console.debug(`|::| Mensaje de debug: ${mensaje}`);
        console.debug(`|::| Fecha: ${new Date()}`);
        console.debug(this.separator + '\n');
    }
}
exports.default = Log;
//# sourceMappingURL=Logs.js.map