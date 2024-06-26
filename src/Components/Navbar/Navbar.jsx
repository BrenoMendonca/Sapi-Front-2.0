import '../Navbar/Navbar.css'
import UniforIcon from "../../Assets/icon-unifor.svg";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//<img className='Logout' src={Logout} alt="Logout Icon" onClick={fazerLogout}></img>
export const Navbar = ()=>{
    const [name, setName] = useState(null);
    useEffect(() => {
      const sessionData = localStorage.getItem('session');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        setName(session.name);
      }
    }, []);

    const fazerLogout = ()=>{
        localStorage.clear()
        window.location.href ='/login'
    }

    //DropDown Menu
    const [isOpen, setIsOpen] = useState (false);

    const handleMouse = () =>{
        setIsOpen(true)
    };

    const handleMouseLeave = () =>{
        setIsOpen(false)
    }
    return(
        <div className="Navbar">
            <Link to='/PaginaInicio' className='Apresentacao'>
                <img className='LogoUnifor' src={UniforIcon} alt="Logo Unifor" />
                <h1>Projetos Unifor</h1>
            </Link>
            
            <div className='name-login'onMouseEnter={handleMouse} onMouseLeave={handleMouseLeave}> 
                
                <div className='botao'>
                    <h4>Bem vindo! </h4>
                    <span className="name">{name} </span>
                </div>
                {isOpen &&(
                <ul className='Opcoes'>
                    <li>Alterar senha</li>
                    <hr></hr>
                    <li className='logout'onClick={fazerLogout}>
                        Logout 
                    </li>
                </ul>
                 )}
            </div>
            
        </div>
        
    )
}

export default Navbar;

//Criar Navbar 
//Puxar o nome do usuário da API
//Deslogar e direcionar para a página de login
