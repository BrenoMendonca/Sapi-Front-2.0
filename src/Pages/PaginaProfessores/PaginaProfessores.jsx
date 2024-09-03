import './../PaginaInicio/paginaInicio.css';
import Navbar from '../../Components/Navbar/Navbar';
import UserService from '../../Services/Services';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {ModalCadastroEdital} from '../../Components/ModalCadastroEdital/ModalCadastroEdital';
import { Load } from '../../Components/Load/Load'
import Apresentacao from '../../Components/Apresentacao/Apresentacao';
// Importando imagens
import editar from '../../Assets/escrever.png';


export const  PaginaProfessores = ()=>{
    const [typeOfUser, setTypeOfUser] = useState(null)

    //Modal Professores
    const [modalIsOpen, setIsOpen] = useState(false);
    
    //Crud Professores
    const [professores, setProfessores] = useState([])
    const [load, setLoad] = useState(false)
  
    const getProfessores= async () =>{
        setLoad(true)
        try{
            const response = await axios.get("http://localhost:3001/user/")

            const data = response.data;

            setProfessores(data);

        } catch(error){
            console.error(error)
        } finally {
            setLoad(false)
        }
    }

    const getTypeOfUser = async () => {
        const lsSession = JSON.parse(localStorage.getItem('session'));
        if (!lsSession || !lsSession.matricula) {
            console.error("Sessão inválida ou sem matrícula");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:3001/user/search-users?mat=${lsSession.matricula}`);
            if (response.data && response.data.length > 0) {
                setTypeOfUser(response.data[0].typeOfUser);
            } else {
                console.error("Usuário não encontrado ou resposta inesperada da API");
            }
        } catch (error) {
            console.error("Erro ao buscar o tipo de usuário", error);
        }   
    }


    useEffect(()=>{
        getProfessores()
        getTypeOfUser()
    },[])

    const handleAtualizarListaProfessores = async () => {
        await getProfessores(); // Aguarda um breve atraso antes de atualizar os editais
    }

    return(
            <div className='PaginaInicio'>
                <Navbar></Navbar>
                <Apresentacao></Apresentacao>
            {modalIsOpen &&(
                <ModalCadastroEdital setView={setIsOpen} atualizarListaEditais={handleAtualizarListaProfessores} />
            )} 
        
            <div className='BackgroundPaginaInicio'>
                <div className="container">
                <div className="header">
                    <h1>Professores</h1>
                    <h2>Filtros</h2>
                    {typeOfUser > 2 && ( 
                        <button onClick={() => setIsOpen(true)}>Criar Edital</button>
                    )}
                    
                </div>
            
                <div className="divTable">
                    <table>
                        <thead>
                        <tr>
                            <th className='titulo-crud'>Nome</th>
                            <th className='titulo-crud'>Matricula</th>
                            <th className='titulo-crud'>Curso</th>
                            <th className='titulo-crud centralizar-elemento'>Email</th>
                            <th className="titulo-crud centralizar-elemento">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        
                    
                        {professores != null &&(
                            professores.slice().reverse().map((professor) => 
                            <tr style={{maxHeight: '5rem'}} key={professor._id}>
                                <td className='num-edital'>{professor.name}</td>
                                <td className='limit-size objetivo'>{professor.matricula}</td>
                                <td className='limit-size'>{professor.curso}</td>
                                <td className='centralizar-elemento'>{professor.email}</td>
                                <td className='centralizar-elemento'>
                                    <img alt="" title="Editar" className='editar' src= {editar}></img>
                                </td>
                            </tr>
                        ))}

                        <tr>
                            <td colSpan="6" className="loading-cell">
                                <div className="loading-container">
                                    {load && <Load />}
                                </div>
                            </td>
                        </tr>
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
        )
}

export default PaginaProfessores;