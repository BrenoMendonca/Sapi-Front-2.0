import Navbar from "../../Components/Navbar/Navbar";
import "../MinhaConta/MinhaConta.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import LapinLogo from "../../Assets/Lapinlogo.jpeg"
import { toast } from 'sonner';

export const MinhaConta = () => {
    const [matricula, setMatricula] = useState(null);
    const [typeOfUser, setTypeOfUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [senhaAtual, setSenhaAtual] = useState(''); // Estado para senha atual
    const [senhaNova, setSenhaNova] = useState(''); // Estado para nova senha
    const [confirmarSenha, setConfirmarSenha] = useState(''); // Estado para confirmar nova senha

    const getDataUser = async () => {
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
    };
    
    useEffect(() => {
        getDataUser();
    }, []);

    const handleChangePassword = async () => {
        // Verifica se as novas senhas correspondem
        if (senhaNova !== confirmarSenha) {
            toast.error("As senhas não coincidem.");
            return;
        }

        const lsSession = JSON.parse(localStorage.getItem('session'));
        if (!lsSession || !lsSession._id) {
            console.error("Sessão inválida ou sem ID");
            return;
        }

        try {
            const response = await axios.patch(`http://localhost:3001/user/change-password/${lsSession._id}`, {
                currentPassword: senhaAtual,
                newPassword: senhaNova,
                confirmPassword: confirmarSenha,
            });
            toast.success(response.data.msg);
                setSenhaAtual('');
                setSenhaNova('');
                setConfirmarSenha('');
          } catch (err) {
              toast.error(JSON.stringify(err.response.data.msg));
          }
    };

    return (
        <div className="MinhaConta">
            <Navbar />
            <div className="BackGroundMinhaConta">
                <img className="lapin-logo" src={LapinLogo} alt="Lapin Logo" />
                <div className="titulo-container">
                    <h2 className="titulo">Olá, {userData ? userData.name : ''} 👋</h2>
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
                            <h6>Matrícula</h6>
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
                                    typeOfUser === 1 
                                    ? 'Coordenador' 
                                    : typeOfUser === 2 
                                    ? 'Professor Doutor' 
                                    : 'Tipo de usuário'
                                } 
                                readOnly
                            />
                        </div>

                        <div className='input-box-userdata'>
                            <h6>Curso</h6>
                            <input 
                                name='curso'
                                className="input-userdata"
                                type='text' 
                                placeholder={userData ? userData.curso : 'curso'} 
                                readOnly
                            />
                        </div>
                        <h5 className="aviso-cadastro">Caso seja necessário alterar seus dados entre em contato com a Vice Reitoria de Pesquisa</h5>
                    </div>

                    <div className="wrapper-alterarsenha">
                        <h2 className="titulo-wrapper">Alterar Senha</h2>

                        <div className='input-box-password'>
                            <input 
                                name='senhaAtual'
                                className="input-password"
                                type='password' 
                                placeholder='Senha atual' 
                                value={senhaAtual}
                                onChange={(e) => setSenhaAtual(e.target.value)}
                            />
                        </div>

                        <div className='input-box-password'>
                            <input 
                                name='senhaNova'
                                className="input-password"
                                type='password' 
                                placeholder='Nova senha' 
                                value={senhaNova}
                                onChange={(e) => setSenhaNova(e.target.value)}
                            />
                        </div>

                        <div className='input-box-password'>
                            <input 
                                name='confirmarSenha'
                                className="input-password"
                                type='password' 
                                placeholder='Confirmar nova senha' 
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                            />
                        </div>

                        <div className='button-box-password'>
                        <button 
                            name='buttonpassword'
                            className="button-password"
                            type='button' 
                            onClick={handleChangePassword}
                            disabled={!senhaAtual || !senhaNova || !confirmarSenha} 
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