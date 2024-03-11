import axios from "axios";


//Camada de acesso a API -- EndPoints

export default class UserService {
  constructor(){
    this.axios = axios.create({
      //ApiURL: process.env.LOGIN_URL
      ApiURL:'http://localhost:3001/auth/login'
    })
  }


  //Rota Autenticação de login
  async login (dados){
    return this.axios.post('http://localhost:3001/auth/login', dados);
  }


  //Rota criação editais
  async criacaoedital(dados){
    return this.axios.post('http://localhost:3001/criacao/edital', dados);
  }
  //Rota GetEditais
  async getEditais (dados){
    return this.axios.get('http://localhost:3001/getEdital/edital', dados)
  } 

}



  const get =() =>{
    axios({
      method: 'get',
      url: 'http://localhost:3001/'
    })
    console.log('get');
  }

