import React, { useState } from 'react'
import '../Login/Login.css'
import UniforIcon from "../../Assets/icon-unifor.svg";
import UniforImage from "../../Assets/UniforCC.png";
import { validarSenha, validarMatricula} from '../../Utils/Validadores';
import UserService from '../../Services/Services';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";
const userService = new UserService()

export const Login = () => {
  const navigate  =useNavigate()
  const toast =useToast()

  const [loading, setLoading] = useState()
  const [form, setForm] = useState([])

  const  handleSubmit = async (event) =>{
    
    
   
    event.preventDefault();

    await userService.login(form)
      .then(({ data }) => {
        if (data.user) {
          const session = {
            //name: data.user.name,
            token: data.user.token,
            matricula: data.user.matricula,
          }
          
          navigate('PaginaInicio');

          localStorage.setItem("session", JSON.stringify(session));
        }
      })
      .catch((err) => {
        toast({
          title: "Erro",
          description: JSON.stringify(err.response.data.msg),
          status: "error",
          duration: 5000, // Duração em milissegundos
          isClosable: true,
        });
        console.log(err)
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
    <div className='BackgroundLogin'>
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
    </div>
  )
}

export default Login;