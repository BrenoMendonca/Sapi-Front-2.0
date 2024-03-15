
import './../PaginaInicio/paginaInicio.css';
import Navbar from '../../Components/Navbar/Navbar';
import UserService from '../../Services/Services';
import React, { useLayoutEffect, useState, useEffect } from "react";
import { BrowserRouter, Routes, Link, Route, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import {ModalCadastro} from '../../Components/Modal/ModalCadastro';
import {Load} from '../../Components/Load/Load'
import Apresentacao from '../../Components/Apresentacao/Apresentacao';
// Importando imagens
import vizualizar from '../../Assets/olho.png';
import editar from '../../Assets/escrever.png';
import { Status } from '../../Components/Status/Status';

//import { Load } from '../../Components/Load/Load';

export const  PaginaInicio = ()=>{
    const navigate = useNavigate()

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

            console.log(data)
            setLoad(false)
        }catch(error){
            console.log(error)

        }
    }

    useEffect(()=>{

        getEditais()
    },[])

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
                <Navbar></Navbar>
                <Apresentacao></Apresentacao>
            {modalIsOpen &&(
                <ModalCadastro setView={setIsOpen} />
            )} 
        
            <div className='BackgroundPaginaInicio'>
                <div className="container">
                <div className="header">
                    <h1>Editais</h1>
                    <button onClick={() => setIsOpen(true)}>Criar Edital</button>
                </div>
            
                <div className="divTable">
                <table>
                    <thead>
                    <tr>
                        <th className='titulo-crud'>Num Edital</th>
                        <th className='titulo-crud'>Criador</th>
                        <th className='titulo-crud'>Titulo do Edital</th>
                        <th className='titulo-crud centralizar-elemento'>Prazo Submissão</th>
                        <th className="titulo-crud centralizar-elemento">Status</th>
                        <th className="titulo-crud centralizar-elemento">Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    
                   
                    {editais != null &&(
                        editais.map((edital) => 
                        <tr key={edital.codigo}>
                            <td className='num-edital'>
                                <Link to={`/edital/${edital._id}`}>
                                    {edital.numeroEdital}
                                </Link>
                            </td>
                            <td>{edital.objetivo}</td>
                            <td>{edital.nameEdital}</td>
                            <td className='centralizar-elemento'>{edital.dataFinal}</td>
                            <td className='centralizar-elemento'><Status status={edital.status}/></td>
                            <td className='centralizar-elemento'>
                                <Link to={`/edital/${edital.numeroEdital}`}>
                                    <img alt="" title="Ver mais informações" className= 'visualizar'src={vizualizar}></img>
                                </Link>

                                <img alt="" title="Editar" className='editar' src= {editar}></img>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="6" className="loading-cell">
                            <div className="loading-container">
                                {load == true &&(
                                    <Load />
                                    )}
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























