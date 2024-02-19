import axios from "axios"
export async function Get(url,params){
    const paramsFormatado = formatarParams(params)
    const urlFormatada = `${url}${paramsFormatado}`
    console.log(urlFormatada)
    return await axios({
      method: "get", 
      url: `${urlFormatada}`
    })
    .then(response =>{ 
      if(response.status == 200){
        return response.data
      }else{
        return false
      }
    })
    .catch(error => console.log(error))
  }
/*
  export async function Post(url, body) {
    try {
      const response = await axios({
        method: 'POST',
        data: body, // Não é necessário JSON.stringify aqui
        headers: {
          'Content-Type': 'application/json',
        },
        url: url,
      });
  
      return response.data;
    } catch (error) {
      console.log(error)
      return {
        codigo: error.response.status,
        mensagem: error.response.data.message,
      };
    }
  }

*/
export async function Post(url, body) {
  try {
    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error)
    return {
      codigo: error.response ? error.response.status : null,
      mensagem: error.response ? error.response.data.message : 'Erro na requisição',
    };
  }
}
export async function Put(url, body) {
  try {
    const response = await axios.put(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error)
    return {
      codigo: error.response ? error.response.status : null,
      mensagem: error.response ? error.response.data.message : 'Erro na requisição',
    };
  }
}

export function formatarParams(params){
    if(params != null){
        var chaves = Object.keys(params)
        var valores = Object.values(params)
        var paramsFormatado = ''
        for(var i=0 ; i < chaves.length ; i++){
            var valorAntigo = paramsFormatado
            if(i == 0){
                paramsFormatado = `?${chaves[i]}=${valores[i]}`
            }else{
                paramsFormatado = `${valorAntigo}&${chaves[i]}=${valores[i]}`
            }
        }
        return paramsFormatado
    }else{
        return ''
    }
}