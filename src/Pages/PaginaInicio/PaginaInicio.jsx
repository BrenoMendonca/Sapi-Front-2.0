import '../PaginaInicio/paginaInicio.css';
import Navbar from '../../Components/Navbar/Navbar';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Load } from '../../Components/Load/Load';
import Apresentacao from '../../Components/Apresentacao/Apresentacao';
import { ModalProfessores } from '../../Components/ModalProfessores/ModalProfessores';

import {ModalCadastroEdital} from '../../Components/ModalCadastroEdital/ModalCadastroEdital'
import { VisaoGrid } from '../../Components/VisaoGrid-Edital/VisaoGrid'; // Importando o VisaoGrid
import { VisaoCard } from '../../Components/VisaoCard-Edital/VisaoCard'; // Importando o VisaoCard
import { Footer } from '../../Components/Footer/Footer';

export const PaginaInicio = () => {
    const [typeOfUser, setTypeOfUser] = useState(null);

    // Modal
    const [modalEditalIsOpen, setModalEditalIsOpen] = useState(false);
    // Crud Editais
    const [editais, setEditais] = useState([]);
    const [load, setLoad] = useState(false);
    // Visão CRUD, agora com 'grid' como padrão
    const [visao, setVisao] = useState('grid'); 

    // Utilização dos filtros - Professores
    const [filteredEditais, setFilteredEditais] = useState([]); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [selectedStatus, setSelectedStatus] = useState('');


    //Função consulta de editais
    const getEditais = async () => {
        setLoad(true);
        try {
            const response = await axios.get("http://localhost:3001/getEdital/");
            const data = response.data;
            console.log(response.data);
            setEditais(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoad(false);
        }
    }

    // Função Para pegar o tipo de usuário
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


    //Função Filtros
    const handleFiltroChange = (event) => {
        setSearchTerm(event.target.value); 
    };

    const handleChange = (event) => {
        setVisao(event.target.value);
    };

    useEffect(() => {
        const normalize = (str) => {
            return typeof str === 'string' ? str.toLowerCase() : ''; // Verificação de tipo
        };
        
        // Filtragem dos editais com base nos critérios fornecidos
        const filtered = editais.filter((edital) => {
            //Filtra por termo
            const nomeMatch = normalize(edital.nameEdital).includes(normalize(searchTerm));
            const numeroMatch = normalize(edital.numeroEdital).includes(normalize(searchTerm));
            //Filtra status por tipo number (se deixar qualquer tipo retorna erro)
            const statusMatch = selectedStatus ? edital.status === Number(selectedStatus) : true;
    
            // Retorna apenas editais que correspondem ao searchTerm e ao status selecionado
            return (nomeMatch || numeroMatch) && statusMatch;
        });
    
        setFilteredEditais(filtered);
    }, [searchTerm, selectedStatus, editais]);


    //Função Status
    const statusOptions = {
        '1': { text: 'Aberto'},
        '2': { text: 'Submissão'},
        '3': { text: 'Em análise'},
        '4': { text: 'Aprovado'},
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    //Função atualização de tipo e de lista de editais
    useEffect(() => {
        getEditais();
        getTypeOfUser();
    }, []);

    const handleAtualizarListaEditais = async () => {
        await getEditais();
    }

    return (
        <div className='PaginaInicio'>
            <Navbar />
            {modalEditalIsOpen && (
                <ModalCadastroEdital setView={setModalEditalIsOpen} atualizarListaEditais={handleAtualizarListaEditais} />
            )}
    
            <div className='BackgroundPaginaInicio'>
                <Apresentacao />
    
                <div className='div-table-header'>
                    <div className='header-apresentacao'>
                        <h2 className='apresentacao-filtros'>Editais</h2>
                        <div className='visao-editais'>
                            <select className='visao-opcoes' onChange={handleChange} value={visao}>
                                <option value="" disabled>Selecione o tipo de visão</option>
                                <option value="grid">Grid</option>
                                <option value="card">Card</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className='header-filtro-btn'>
                        <div className='header-filtros-edital'>
                            <div className="filtro-pesquisa-edital">
                                <input 
                                    className='filtro-pesquisa-edital-input' 
                                    type="text" 
                                    placeholder="Pesquisar..." 
                                    value={searchTerm} 
                                    onChange={handleFiltroChange} 
                                />
                            </div>
                            {/*
                            <div className="filtro-pesquisa-curso">
                                <select className='filtro-pesquisa-curso-select'>
                                    <option value="" disabled selected>Selecione o curso</option>
                                </select>
                            </div>
                            */}
                            <div className="filtro-select-status">
                                <select
                                    className='filtro-selecao-status-select'
                                    value={selectedStatus}
                                    onChange={handleStatusChange}
                                >
                                    {/* Opção para limpar o filtro */}
                                    <option value="">Todos os Status</option>
                                    {Object.entries(statusOptions).map(([key, value]) => (
                                    <option key={key} value={key}>{value.text}</option>
                                    ))}
                                </select>
                            </div>

                           
                        </div>

                        <div className='btn-header-paginainicio'>
                                <button className='btn-criacao-edital' onClick={() => setModalEditalIsOpen(true)}>
                                    Criar Edital

                                </button>
                            </div>
                    </div>
                </div>
    
                <div className="container-grid">
                    {visao === 'grid' && <VisaoGrid editais={filteredEditais} />}
                    {visao === 'card' && <VisaoCard editais={filteredEditais} />}
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default PaginaInicio;
