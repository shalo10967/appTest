import CONSTANTES from '../store/CONSTANTES';

const DEFAULT_STATE = {
  data: [],
  waiting: false,
  error: '',
  apiRespuesta: false,
  errordata: "",
  estado: '',
  apiError: null
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CONSTANTES.BANCOS_LISTA_OBTENER:
      return { ...state, error: "", waiting: true, error: '', apiError: null, estado: '', };
    case CONSTANTES.BANCOS_LISTA_RECIBE:
      return { ...state, data: action.data, waiting: false, error: '', apiError: null, estado: 'LISTADO', apiRespuesta: true };

      case CONSTANTES.LIMPIAR_ESTADO:
        return {
          ...state,          
          apiRespuesta: false,
          error: '',
          apiError: null
        };
  
      case CONSTANTES.LIMPIAR_ESTADO_DESMONTAR:
        return {
          ...state,          
          error: '',
          apiRespuesta: false,
          estado: '',
          enviandodata: "",
          apiError: null
        };

    case CONSTANTES.API_ERROR_RESPUESTA:
      return {
        ...state,
        waiting: false,
        error: action.error ? (`${(action.error.descripcion ? action.error.descripcion : 'Se ha producido un error inesperado, revisa la conexión de red.')
          ||
          (action.error.mensaje ? action.error.mensaje : 'Se ha producido un error inesperado, revisa la conexión de red.')
          }`) : 'API Error.',
        apiError: action.error,
        mensaje: action.error ? (`${action.error.descripcion || action.error.mensaje}`) : 'API Error.',
        estado: 'ERROR',
        actualizar: true,
        apiRespuesta: true
      };
    default:
      return state;
  }
};
