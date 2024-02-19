import React, { useState } from 'react'
import '../Login/Login.css'
import UniforIcon from "../../Assets/icon-unifor.svg";
import UniforImage from "../../Assets/UniforCC.png";
import { Post } from '../../Utils/requisitions';
import axios from 'axios';

export const Login = () => {

const [matricula, setMatricula] = useState("")
const [password,setPassword] = useState("")
const[token,setToken] = useState("")
const handleSubmit = async (e) => {
  e.preventDefault();

  const userCredentials = {
    matricula,
    password,
    token
  };
  console.log(userCredentials)
try{
  const res = await axios.post('http://localhost:3001/auth/login', userCredentials,{
    //method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    data: JSON.stringify(userCredentials),
  }); console.log(res.data);
  
}catch(erro){
    console.log(erro)
  }
}

  return (
    <div className='BackgroundLogin'>
      <div className='wrapper'>
        <div className='Login'>
          <div className='logo-container'>
            <img className='LogoUnifor' src={UniforIcon} alt="Logo Unifor" />
          </div>
          <h1>Acesso ao Sistema de acompanhamento de Projetos de inovação</h1>

          <div className='input-box'>
              <input 
              type='text'
              name='matricula'
              value ={matricula}
              placeholder='Matricula' 
              required
              onChange={(e)=>setMatricula(e.target.value)}>
              </input>
          </div>

          <div className='input-box'>
              <input 
              type='password' 
              name='password'
              value = {password}
              placeholder='Senha' 
              required
              onChange={(e)=>setPassword(e.target.value)}>
              </input>
          </div>

        {/*} <div className='remenber-forgot'>
              <label><input type='checkbox'/>Lembre-me</label>
              </div> */}
          
          <button type='submit' onClick={handleSubmit}>Acessar</button>
          
          <div className='Registre-se'>
              <p>Não tem conta? <a href='#'>Cadastre-se</a></p>
          </div>
          </div>
              <img className='UniforImage' src={UniforImage} alt="Imagem CC"/>
          
      </div>
    </div>
  )
}

export default Login;