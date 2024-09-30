import Navbar from "../../Components/Navbar/Navbar";
import "../MinhaConta/MinhaConta.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import LapinLogo from "../../Assets/Lapinlogo.jpeg"


export const MinhaConta = () =>{

    const [matricula, setMatricula] = useState(null);
    const [typeOfUser, setTypeOfUser] = useState(null);
    const [userData, setUserData] = useState(null);

    const getDataUser = async () => {
        console.log(localStorage);

        const lsSession = JSON.parse(localStorage.getItem('session'));

            if (!lsSession || !lsSession._id) {
                console.error("Sessão inválida ou sem ID");
                return;
            }
            try {
                const response = await axios.get(`http://localhost:3001/user/${lsSession._id}`);
                
                if (response.data) {
                    const userData = response.data; 
                    setTypeOfUser(userData.typeOfUser); 
                    setUserData(userData); 
                } else {
                    console.error("Usuário não encontrado ou resposta inesperada da API");
                }
            } catch (error) {
                console.error("Erro ao buscar o tipo de usuário", error);
            }
    }
    
    useEffect(() => {
        getDataUser();
    }, []);

    return (
        <div className="MinhaConta">
            <Navbar />
            <div className="BackGroundMinhaConta">
                <img className="lapin-logo" src={LapinLogo}></img>
                <div className="titulo-container">
                    <h2 className="titulo">Bem vindo {userData ? userData.name : ''}</h2>
                </div>

                <div className="wrapper-container"> 
    
                    <div className="wrapper-dadousuario">
                        <h2 className="titulo-wrapper">Dados do Usuário</h2>

                        <div className='input-box-userdata'>
                            <h6>Nome</h6>
                            <input 
                                name='nome'
                                className="input-userdata"
                                type='text' 
                                placeholder={userData ? userData.cpf : 'CPF do usuário'}
                                readOnly
                            />
                        </div>

                        <div className='input-box-userdata'>
                        <h6>Matricula</h6>
                            <input 
                                name='matricula'
                                className="input-userdata"
                                type='text' 
                                placeholder={userData ? userData.matricula : 'Matrícula'} 
                                readOnly
                            />
                        </div>

                        <div className='input-box-userdata'>
                        <h6>Tipo de usuário</h6>
                            <input 
                                name='typeOfUser'
                                className="input-userdata"
                                type='text' 
                                placeholder={
                                    typeOfUser == 1  // Compara com número
                                    ? 'Coordenador' 
                                    : typeOfUser == 2  // Compara com número
                                    ? 'Professor Doutor' 
                                    : 'Tipo de usuário'
                                } 
                                readOnly
                            />
                        </div>

                        <div className='input-box-userdata'>
                        <h6>curso</h6>
                            <input 
                                name='curso'
                                className="input-userdata"
                                type='text' 
                                placeholder={userData ? userData.curso : 'curso'} 
                                readOnly
                            />
                        </div>

                    </div>

                    <div className="wrapper-alterarsenha">
                        <h2 className="titulo-wrapper">Alterar Senha</h2>

                        <div className='input-box-password'>
                            <input 
                                name='senhaAtual'
                                className="input-password"
                                type='password' 
                                placeholder='Senha atual' 
                            />
                        </div>

                        <div className='input-box-password'>
                            <input 
                                name='senhaNova'
                                className="input-password"
                                type='password' 
                                placeholder='Senha' 
                            />
                        </div>

                        <div className='input-box-password'>
                            <input 
                                name='confirmarSenha'
                                className="input-password"
                                type='password' 
                                placeholder='Confirmar senha' 
                            />
                        </div>

                        <div className='button-box-password'>
                            <button 
                                name='buttonpassword'
                                className="button-password"
                                type='button' 
                            >
                                Redefinir senha
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MinhaConta;