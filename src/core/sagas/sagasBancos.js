import { takeEvery, call, put } from 'redux-saga/effects';
import CONSTANTES from '@core/store/CONSTANTES';

import {
  actionBancosListaRecibe,
  actionApiErrorRespuesta,
  actionApiSolicitud} from '@core/store/ACCIONES';

import {
  apiBancos
} from '@core/api/bancos'

function* sagaBancos({ params }) {
  try {
    yield put(actionApiSolicitud())
    const resp = yield call(apiBancos, params);
    yield put(actionBancosListaRecibe(resp));
  } catch (error) {
    yield put(actionApiErrorRespuesta(error));
  }
}

export default [
  takeEvery(CONSTANTES.BANCOS_LISTA_OBTENER, sagaBancos),
]