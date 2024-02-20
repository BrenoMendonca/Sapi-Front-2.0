import React, { useState } from 'react'
import './Login.css';
import UniforIcon from "../../Assets/icon-unifor.svg";
import UniforImage from "../../Assets/UniforCC.png";
import { validarSenha, validarMatricula} from '../../Utils/Validadores';
import UserService from '../../Services/Services';


const userService = new UserService()


export const Login = () => {
  /*
  function buttonFunction(){
    getfunction()
    .then(data=>console.log(data))
    .catch(error => console.error(error));

  }
  */
  const [loading, setLoading] = useState()
  const [form, setForm] = useState([])

  const  handleSubmit = async (event) =>{
    event.preventDefault();

    await userService.login(form)
      .then(({ data }) => {
        if (data.user) {
          const session = {
            name: data.user.name,
            token: data.user.token,
            matricula: data.user.matricula,
          };

          localStorage.setItem("session", JSON.stringify(session));
        }
      })
      .catch((err) => {
        alert(JSON.stringify(err.response.data.msg));
      });
  }

  
  const validadorInput = () =>{
    return validarMatricula(form.matricula) && validarSenha(form.password)
  }
  console.log('Form está valido?',validadorInput())
  

  const handleChange = (event) =>{
    console.log('Digitando...',event.target.name, event.target.value)
    setForm({...form,[event.target.name]: event.target.value})
    console.log('Form',form)
  }


  return (
    <div className='wrapper'>
       <div className='Login'>
        <div className='logo-container'>
          <img className='LogoUnifor' src={UniforIcon} alt="Logo Unifor" />
        </div>
        <h1>Acesso ao Sistema de acompanhamento de Projetos de inovação</h1>
        <div className='input-box'>
            <input 
            name='matricula'
            type='text' 
            placeholder='Matricula' 
            onChange={handleChange} required></input>
        </div>
        <div className='input-box'>
            <input 
            name='password'
            type='password' 
            placeholder='senha' 
            onChange={handleChange}required></input>
        </div>

       {/*} <div className='remenber-forgot'>
            <label><input type='checkbox'/>Lembre-me</label>
             </div> */}
        
        <button 
        type='submit' 
        onClick={handleSubmit}
        disabled={loading === true || !validadorInput}
        >Acessar</button>
  

        <div className='Registre-se'>
            <p>Não tem conta? <a href='#'>Cadastre-se</a></p>
        </div>
        </div>
            <img className='UniforImage' src={UniforImage} alt="Imagem CC"/>
        
    </div>

  )
}

export default Login;