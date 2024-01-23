import React, { useState } from 'react'
import './Login.css';
import UniforIcon from "../../Assets/icon-unifor.svg";
import UniforImage from "../../Assets/UniforCC.png";
import { Post } from '../../Utils/requisitions';


export const Login = () => {
  const [alerta, setAlerta] = useState(null)
  const logar = async () =>{
    var params = {
        "login":"login",
        "senha":"senha"
    }
    //var autenticar = await Post('endpointLogin', params)
    var autenticar = {
      error:"Credenciais Inválidas"
    } 
    if(autenticar.hasOwnProperty('error')){
      setTimeout(() => {
        setAlerta(null)
      }, 6000);
      setAlerta(autenticar.error)
      return
    }
  }

  return (
    <div className='wrapper'>
       <div className='Login'>
        <div className='logo-container'>
          <img className='LogoUnifor' src={UniforIcon} alt="Logo Unifor" />
        </div>
        <h1>Acesso ao Sistema de acompanhamento de Projetos de inovação</h1>
        <div className='input-box'>
            <input type='text' placeholder='Matricula' required></input>
        </div>
        <div className='input-box'>
            <input type='password' placeholder='Senha' required></input>
        </div>

       {/*} <div className='remenber-forgot'>
            <label><input type='checkbox'/>Lembre-me</label>
             </div> */}
        
        <button type='submit' onClick={logar}>Acessar</button>
          {alerta != null &&(
            <h1>{alerta}</h1>
          )}
        <div className='Registre-se'>
            <p>Não tem conta? <a href='#'>Cadastre-se</a></p>
        </div>
        </div>
            <img className='UniforImage' src={UniforImage} alt="Imagem CC"/>
        
    </div>

  )
}

export default Login;