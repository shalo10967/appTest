export const DEFAULT_HEADERS = {
  headers: new Headers({
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }),
};

export const apiPeticionExitosa = async response => {
  //if(__DEV__) console.log(`${response.status}:${response.url}`)
  //console.log("Respuesta servicio login api", response);
  //console.log("Peticion exitosa: ", response)
  if(response.status === 200) return response.json()
  else if(response.status === 400) throw await response.json()
  else throw response;
};

export const apiErrorHandler = async (response) => {
  console.log("Solicitud servicio API falló.: ", response);
  if(JSON.stringify(response).includes('pinning failure')){
    console.log("Error de certificado: ");
    fetch(API_SSL_RESULT)
    .then((response) =>console.log(response))
    .catch((error) => {
      console.error(error);
    });
    throw { codigo: response.status, mensaje: `Compruebe su conexión a internet e intente nuevamente.`};
  } else if (response.includes('Read timed out')){
    throw { codigo: response.status, mensaje: `Compruebe su conexión a internet e intente nuevamente.`};
  } else if (response.includes('failed to connect to conexion')){
    throw { codigo: response.status, mensaje: `Compruebe su conexión a internet e intente nuevamente.`};
  }
  else{
    var responseJSON = await JSON.parse(await response.bodyString.toString())
    if(responseJSON.descripcion) throw await responseJSON;
    else throw { codigo: response.status, mensaje: `Compruebe su conexión a internet e intente nuevamente.`};
  }
};


