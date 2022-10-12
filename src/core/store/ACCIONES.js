import CONSTANTES from './CONSTANTES';

// --------------------------------------------------------------------------
//Bancos
export const actionBancosListaObtener = params => ({
    type: CONSTANTES.BANCOS_LISTA_OBTENER,
    params
});
export const actionBancosListaRecibe = data => ({
    type: CONSTANTES.BANCOS_LISTA_RECIBE,
    data
});

export const actionApiErrorRespuesta = error => ({ type: CONSTANTES.API_ERROR_RESPUESTA, error });
export const actionApiSolicitud = () => ({ type: CONSTANTES.API_SOLICITUD, });

export const actionLimpiarEstado = () => ({ type: CONSTANTES.LIMPIAR_ESTADO });
export const actionLimpiarEstadoDesmontar = () => ({ type: CONSTANTES.LIMPIAR_ESTADO_DESMONTAR });
// --------------------------------------------------------------------------
export const actionStorageSetItem = (key, value) => ({ type: CONSTANTES.STORAGE_SET_ITEM, payload: { key, value } });
export const actionStorageDeleteItem = (key) => ({ type: CONSTANTES.STORAGE_DELETE_ITEM, payload: key });
export const actionStorageClear = () => ({ type: CONSTANTES.STORAGE_CLEAR });