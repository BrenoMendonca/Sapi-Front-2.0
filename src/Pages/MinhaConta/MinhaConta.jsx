import Navbar from "../../Components/Navbar/Navbar";
import "../MinhaConta/MinhaConta.css"



export const MinhaConta = () =>{


    return(
        <div className="AlterarSenha">
            <Navbar></Navbar>
            <div className="BackGroundAlterarSenha">
                <div className="wrapper-alterarsenha">
                    <h2 className="titulo">
                        Alterar Senha
                    </h2>
                    <div className='input-box-password'>
                        <input 
                            name='password'
                            className="input-password"
                            type='password' 
                            placeholder='Senha' 
                        />
                    </div>
                    
                    <div className='input-box-password'>
                        <input 
                            name='password'
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
    )
}
export default MinhaConta;