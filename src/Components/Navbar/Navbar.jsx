import '../Navbar/Navbar.css'
import UniforIcon from "../../Assets/icon-unifor.svg";
import React, { useEffect, useState } from 'react';


export const Navbar = ()=>{
    

    return(
        <div className="Navbar">
            <div className='Apresentacao'>
                <img className='LogoUnifor' src={UniforIcon} alt="Logo Unifor" />
                <h1>Projetos Unifor</h1>
            </div>
                <h4>Bem vindo! Daniel chagas</h4>
        </div>
    )
}

export default Navbar;

//Criar Navbar 
//Puxar o nome do usuário da API
//Deslogar e direcionar para a página de login
