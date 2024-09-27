
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
import vizualizar from '../../Assets/olho.png';
import editar from '../../Assets/escrever.png';
import { Status } from '../../Components/Status/Status';

//import { Load } from '../../Components/Load/Load';

export const  PaginaInicio = ()=>{
    const [typeOfUser, setTypeOfUser] = useState(null)

    //Modal
    const [modalIsOpen, setIsOpen] = useState(false);
    //Crud Editais
    const [editais, setEditais] = useState([])
    const [load, setLoad] = useState(false)

    // CAPTURAR DADOS DO PARAMETRO DA URL
    //const {state} = useLocation()
    //const [codigo, setCodigo] = useState(state.codigo)
  
    const getEditais = async () =>{
        setLoad(true)
        try{
            const response = await axios.get("http://localhost:3001/getEdital/")

            const data = response.data;

            setEditais(data);

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
        getEditais()
        getTypeOfUser()
    },[])

    const handleAtualizarListaEditais = async () => {
        await getEditais(); // Aguarda um breve atraso antes de atualizar os editais
    }

    const buscarEdital = async () =>{
        
        //buscar editais
        // tratar caso nao tenha ou ter dado erro
        // if(sem editais){
        // setLoad(false)
        // setEditais(null)
        // setAlerta('sem editais')
        // return 
        //}
        // setar os editais em um estado
        // setEditais(editaisJson)
        // setLoad(false)
    }
    
    return(
            <div className='PaginaInicio'>
                {/* <Sidebar></Sidebar> */}
                <Navbar></Navbar>
                <Apresentacao></Apresentacao>
            {modalIsOpen &&(
                <ModalCadastroEdital setView={setIsOpen} atualizarListaEditais={handleAtualizarListaEditais} />
            )} 
        
            <div className='BackgroundPaginaInicio'>
                <div className="container">
                <div className="header">
                    <h1>Editais</h1>
                    
                    {typeOfUser > 2 && ( 
                        <button className='button-criaredital' onClick={() => setIsOpen(true)}>Criar Edital</button>
                    )}
                    
                </div>
            
                <div className="divTable">
                    <table>
                        <thead>
                        <tr>
                            <th className='titulo-crud'>Num Edital</th>
                            <th className='titulo-crud'>Objetivo</th>
                            <th className='titulo-crud'>Titulo do Edital</th>
                            <th className='titulo-crud centralizar-elemento'>Prazo para envio</th>
                            <th className="titulo-crud centralizar-elemento">Status</th>
                            <th className="titulo-crud centralizar-elemento">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        
                    
                        {editais != null &&(
                            editais.slice().reverse().map((edital) => 
                            <tr style={{maxHeight: '5rem'}} key={edital._id}>
                                <td className='num-edital'>
                                    <Link to={`/edital/${edital._id}`}>
                                        {edital.numeroEdital}
                                    </Link>
                                </td>
                                <td className='limit-size objetivo'>{edital.objetivo}</td>
                                <td className='limit-size'>{edital.nameEdital}</td>
                                <td className='centralizar-elemento'>{edital.dataFinal}</td>
                                <td className='centralizar-elemento'><Status status={edital.status}/></td>
                                <td className='centralizar-elemento'>
                                    <Link to={`/edital/${edital._id}`}>
                                        <img alt="" title="Ver mais informações" className= 'visualizar'src={vizualizar}></img>
                                    </Link>

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

export default PaginaInicio;