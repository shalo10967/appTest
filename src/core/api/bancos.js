
import {
  URL_API_BANCOS,
} from './endpoints'

import {
  DEFAULT_HEADERS,
  apiPeticionExitosa,
  apiErrorHandler
} from './commons';


export const apiBancos = async params => {

  return await fetch(URL_API_BANCOS,
    {
      method: "GET",
      headers: {
        ...DEFAULT_HEADERS.headers,
        //Authorization: userToken
      },
    }
  )
    .then(apiPeticionExitosa)
    .catch(apiErrorHandler);
}