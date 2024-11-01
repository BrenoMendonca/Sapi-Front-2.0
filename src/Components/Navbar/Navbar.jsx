import '../Navbar/Navbar.css'
import UniforIcon from "../../Assets/logo-unifor2.svg";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LapinLogo from "../../Assets/Lapinlogo.jpeg"
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

    //Função para capturar as duas primeiras letras do nome
    const getInitials = (fullName) => {
        if (!fullName) return ""; // Verifica se fullName é null ou undefined
        const nameArray = fullName.trim().split(" ");
        const firstInitial = nameArray[0]?.[0] || "";
        const lastInitial = nameArray.length > 1 ? nameArray[nameArray.length - 1][0] : "";
        return `${firstInitial}${lastInitial}`.toUpperCase();
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
            <div to='/PaginaInicio' className='Apresentacao'>
                <Link to='/PaginaInicio'>
                    <img className='LogoUnifor' src={UniforIcon} alt="Logo Unifor" />
                </Link>
                <Link className="navigate-to-page" to='/PaginaInicio'>
                    <h3>Projetos Unifor</h3>
                </Link>
                <Link className="navigate-to-page" to='/requisitos-padrao'>
                    <h3>Requisitos</h3>
                </Link>
                <Link className="navigate-to-page" to='/Paginaprofessores'>
                    <h3>Professores cadastrados</h3>
                </Link>
            </div>
            <div className='opcoes-usuario'>
                <div className='name-login' onMouseEnter={handleMouse} onMouseLeave={handleMouseLeave}>
                    <div className='botao'>
                        <h4 className='bem-vindo'>Bem vindo! </h4>
                        <div className="avatar-circle">
                                {getInitials(name)}
                        </div>
                    </div>
                    {isOpen && (
                        <ul className='Opcoes'>
                            <div className='apresentacao-opcoes'>
                                <h3 className='apresenacao-nome'>Você acessou como:<br />{name}</h3>
                            </div>
                            <div className='li-opcoes'></div>
                                <li onClick={irParaMinhaConta}>Minha conta</li>  {/* Adiciona o redirecionamento */}
                                <hr />
                                <li className='logout' onClick={fazerLogout}>Logout</li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;