import '../Navbar/Navbar.css'
import UniforIcon from "../../Assets/logo-unifor2.svg";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//<img className='Logout' src={Logout} alt="Logout Icon" onClick={fazerLogout}></img>
export const Navbar = () => {
    const [name, setName] = useState(null);
    const navigate = useNavigate();  // Hook para redirecionamento

    useEffect(() => {
      const sessionData = localStorage.getItem('session');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        setName(session.name);
      }
    }, []);

    const fazerLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    // DropDown Menu
    const [isOpen, setIsOpen] = useState(false);

    const handleMouse = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    const irParaMinhaConta = () => {
        navigate('/MinhaConta');  // Redireciona para /MinhaConta
    };

    return (
        <div className="Navbar">
            <Link to='/PaginaInicio' className='Apresentacao'>
                <img className='LogoUnifor' src={UniforIcon} alt="Logo Unifor" />
                <h3>Projetos Unifor</h3>
                <h3>Requisitos</h3>
                <h3>Professores cadastrados</h3>
            </Link>

            <div className='name-login' onMouseEnter={handleMouse} onMouseLeave={handleMouseLeave}>
                <div className='botao'>
                    <h4>Bem vindo! </h4>
                    <span className="name">{name} </span>
                </div>
                {isOpen && (
                    <ul className='Opcoes'>
                        <li onClick={irParaMinhaConta}>Minha conta</li>  {/* Adiciona o redirecionamento */}
                        <hr />
                        <li className='logout' onClick={fazerLogout}>Logout</li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Navbar;