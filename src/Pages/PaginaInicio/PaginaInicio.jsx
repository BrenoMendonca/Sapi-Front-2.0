
import './../PaginaInicio/paginaInicio.css';
import Navbar from '../../Components/Navbar/Navbar';
import UserService from '../../Services/Services';
import React, { useLayoutEffect, useState, useEffect } from "react";
import { BrowserRouter, Routes, Link, Route, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import {ModalCadastro} from '../../Components/Modal/ModalCadastro';
import Apresentacao from '../../Components/Apresentacao/Apresentacao';
// Importando imagens
import vizualizar from '../../Assets/olho.png';
import editar from '../../Assets/escrever.png';

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
        try{
            const response = await axios.get("http://localhost:3001/getEdital/edital")

            const data = response.data;

            setEditais(data);

            console.log(data)
        }catch(error){
            console.log(error)

        }
    }

    useEffect(()=>{

        getEditais()
    },[])

    const buscarEdital = async () =>{
        setLoad(true)
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
                        <th className='titulo-crud'>Prazo Submissão</th>
                        <th className="titulo-crud">Status</th>
                        <th className="titulo-crud">Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*
                    {load == true &&(
                        <Load />
                    )}*/}
                    {editais != null &&(
                        editais.map((edital) => 
                        <tr key={edital.codigo}>
                            <td className='numEdital'>{edital.numeroEdital}</td>
                            <td>{edital.objetivo}</td>
                            <td>{edital.nameEdital}</td>
                            <td>{edital.dataFinal}</td>
                            <td>{edital.status}</td>
                            <td className='acaoEdital'>
                                <Link to={`/edital${edital.numeroEdital}`}>
                                    <img className= 'vizualizar'src={vizualizar}></img>
                                </Link>
                                <img className='editar' src= {editar}></img>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
        )
}

export default PaginaInicio;























