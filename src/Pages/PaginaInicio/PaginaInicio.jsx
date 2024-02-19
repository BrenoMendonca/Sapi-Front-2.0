import React from 'react';
import './../PaginaInicio/paginaInicio.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { useLayoutEffect, useState } from "react";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';



export const  PaginaInicio = ()=>{

    return(
        <div className='PaginaInicio'>
            <Navbar></Navbar>
            <div className='BackgroundPaginaInicio'>
                <div className="container">
                <div className="header">
                <span>Editais</span>
                <button>Novo Edital</button>
                </div>
            
                <div className="divTable">
                <table>
                    <thead>
                    <tr>
                        <th>Num Edital</th>
                        <th>Criador</th>
                        <th>Titulo do Edital</th>
                        <th>Prazo Submissão</th>
                        <th className="action">Status</th>
                        <th className="action">Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Aqui você pode adicionar as linhas da tabela, se houver */}
                    </tbody>
                </table>
                </div>
            
                <div className="modal-container">
                <div className="modal">
                    <form>
                    <div className='input-num'>
                        <input 
                        type='text' 
                        name='num'
                        placeholder='numero do edital' 
                        required
                        />
                    </div>
                    <div className='input-titulo'>
                        <input 
                        type='text' 
                        name='titulo-edital'
                        placeholder='Titulo Edital' 
                        required
                        />
                    </div>
                    <div className='input-PrazoSubmissão'>
                        <input 
                        type='date' 
                        name='prazo submissão'
                        placeholder='Prazo Submissão' 
                        required
                        />
                    </div>
                    <button>Salvar</button>
                    </form>
                </div>
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
    )
};

export default PaginaInicio;

*/