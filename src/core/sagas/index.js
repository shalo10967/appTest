
import { all } from './../../../node_modules/redux-saga/effects';

import sagasBancos from './sagasBancos';
export default function* rootSaga() {
  yield all([
    ...sagasBancos,
  ]);
}
