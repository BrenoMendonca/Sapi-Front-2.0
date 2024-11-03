import './../PaginaProfessores/PaginaProfessores.css';
import Navbar from '../../Components/Navbar/Navbar';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Load } from '../../Components/Load/Load'
import Apresentacao from '../../Components/Apresentacao/Apresentacao';
// Importando imagens
import editar from '../../Assets/escrever.png';
import {ModalProfessores} from '../../Components/ModalProfessores/ModalProfessores'
import { ModalEdicaoProfessor } from '../../Components/ModalEdicaoProfessor/ModalEdicaoProfessor';
import { Footer } from '../../Components/Footer/Footer';
import {VisaoGridProfessores} from '../../Components/VisaoGrid-Professores/VisaoGridProfessores'

export const PaginaProfessores = () => {
  // Estado dos modais
  const [ModaCriacaolIsOpen, setModaCriacaolIsOpen] = useState(false);

  // Estado dos professores, cursos e carregamento
  const [professores, setProfessores] = useState([]);
  const [filteredProfessores, setFilteredProfessores] = useState([]);
  const [load, setLoad] = useState(false);
  const [typeOfUser, setTypeOfUser] = useState(null);
  const [selectedCurso, setSelectedCurso] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cursos, setCursos] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  const getProfessores = async () => {
    setLoad(true);
    try {
      const response = await axios.get("http://localhost:3001/user/");
      const data = response.data;
      setProfessores(data);
      console.log(data)

      // Extrair cursos únicos
      const cursosUnicos = [...new Set(data.map(p => p.curso))];
      setCursos(cursosUnicos);

      // Inicialmente, exibir todos os professores
      setFilteredProfessores(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
    }
  };

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
  };

  useEffect(() => {
    getProfessores();
    getTypeOfUser();
  }, []);

  useEffect(() => {
    // Filtra professores com base no termo de pesquisa e no curso selecionado
    setFilteredProfessores(professores.filter(p => 
      (
        (p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (p.curso && p.curso.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.email && p.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.matricula && p.matricula.toLowerCase().includes(searchTerm.toLowerCase())) // Pesquisa por matrícula
      ) &&
      (selectedCurso ? p.curso === selectedCurso : true)
    ));
  }, [searchTerm, selectedCurso, professores]);

  const handleAtualizarListaProfessores = async () => {
    await getProfessores();
  };

  return (
    <div className='PaginaInicio'>
        <Navbar />
        {ModaCriacaolIsOpen && (
            <ModalProfessores setView={setModaCriacaolIsOpen} atualizarListaProfessores={handleAtualizarListaProfessores} />
        )}

        <div className='BackgroundPaginaInicio'>
            <Apresentacao />

            <div className='div-table-header'>
                <div className='header-apresentacao'>
                    <h2 className='apresentacao-filtros'>Professores</h2>
                    <div className='visao-editais'>
                        <select className='visao-opcoes'>
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
                          <div className="filtro-pesquisa-curso">
                              <select className='filtro-pesquisa-curso-select'>
                                  <option value="" disabled selected>Selecione o curso</option>
                              </select>
                          </div>
                        </div>  
                    </div>

                    <div className='btn-header-paginainicio'>
                            <button className='btn-criacao-edital' onClick={() => setModaCriacaolIsOpen(true)}>
                                Criar Professor

                            </button>
                        </div>
                </div>
            </div>
           <div className="container-grid">
                <VisaoGridProfessores professores={filteredProfessores} atualizarProfessores={handleAtualizarListaProfessores}/>
            </div>
                              
           
        </div>
        <Footer></Footer>
    </div>
);
};

export default PaginaProfessores;
