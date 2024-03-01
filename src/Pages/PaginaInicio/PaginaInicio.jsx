import React, { useEffect } from 'react';
import './../PaginaInicio/paginaInicio.css';
import Navbar from '../../Components/Navbar/Navbar';
import UserService from '../../Services/Services';
import { useLayoutEffect, useState } from "react";
import { BrowserRouter, Routes, Link, Route, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import {ModalCadastro} from '../../Components/Modal/ModalCadastro';
//import { Load } from '../../Components/Load/Load';

export const  PaginaInicio = ()=>{
    const navigate = useNavigate()
    const [modalIsOpen, setIsOpen] = useState(false);
    const [editais, setEditais] = useState(null)
    const [load, setLoad] = useState(false)

    // CAPTURAR DADOS DO PARAMETRO DA URL
    //const {state} = useLocation()
    //const [codigo, setCodigo] = useState(state.codigo)

    useEffect(() =>{
        const buscar = async () =>{
            await buscarEdital()
        }
        buscar()
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
                            editais.map(item =>
                            <div>
                                <h1>{item.numero}</h1>
                                <h1>{item.criador}</h1>
                                <button onClick={() => navigate(`/paginaDetalhes`,{ state: { codigo:item.codigo} }) }>EDITAR</button>
                            </div>
                            )
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
        )
}

export default PaginaInicio;

























/*
export const PaginaInicio = () =>{
    const [user, setUser] = useState(null)
    const [editais, setEdital] = useState([])
    useLayoutEffect(() =>{
        //chamar a função
        setUser({
            nome:"User Teste",
            tipo:"prof"
        })
    },[])

    return(
        <div>
            {user != null &&(
                user.tipo == "prof"
                ?
                <h1>Olá professor</h1>
                :
                <h1>Olá Aluno</h1>
            )}
            {user != null && user.tipo == "prof" &&(
                <h1>Formulario Edital</h1>
            )}
            {/* 
            {editais != null &&(
                editais.map(item =>
                <ComponenteEdital item={item} />    
                )
            )}
            }

        </div>
      </div>


      </div>
    </div>
}

export default PaginaInicio;

*/