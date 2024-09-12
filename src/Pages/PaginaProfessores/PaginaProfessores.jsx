import './../PaginaInicio/paginaInicio.css';
import Navbar from '../../Components/Navbar/Navbar';
import UserService from '../../Services/Services';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Load } from '../../Components/Load/Load'
import Apresentacao from '../../Components/Apresentacao/Apresentacao';
// Importando imagens
import editar from '../../Assets/escrever.png';
import {ModalProfessores} from '../../Components/ModalProfessores/ModalProfessores'
import { ModalEdicaoProfessor } from '../../Components/ModalEdicaoProfessor/ModalEdicaoProfessor';

export const PaginaProfessores = () => {
  // Estado dos modais
  const [ModaCriacaolIsOpen, setModaCriacaolIsOpen] = useState(false);
  const [ModalEdicaoIsOpen, setModalEdicaoIsOpen] = useState(false);

  // Estado dos professores, cursos e carregamento
  const [professores, setProfessores] = useState([]);
  const [filteredProfessores, setFilteredProfessores] = useState([]);
  const [load, setLoad] = useState(false);
  const [typeOfUser, setTypeOfUser] = useState(null);
  const [selectedCurso, setSelectedCurso] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Para armazenar cursos únicos
  const [cursos, setCursos] = useState([]);

  const getProfessores = async () => {
    setLoad(true);
    try {
      const response = await axios.get("http://localhost:3001/user/");
      const data = response.data;
      setProfessores(data);

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
      <Apresentacao />

      {/* Renderiza o ModalProfessores se o estado ModaCriacaolIsOpen for true */}
      {ModaCriacaolIsOpen && (
        <ModalProfessores 
          onClose={() => setModaCriacaolIsOpen(false)} 
          atualizarListaEditais={handleAtualizarListaProfessores} 
        />
      )}

      {/* Renderiza o ModalEdicaoProfessor se o estado ModalEdicaoIsOpen for true */}
      {ModalEdicaoIsOpen && (
        <ModalEdicaoProfessor 
          onClose={() => setModalEdicaoIsOpen(false)} 
        />
      )}

      <div className='BackgroundPaginaInicio'>
        <div className="container">
          <div className="header">
            <h1>Professores</h1>
            <div className="header-filtros">
              <h2>Filtros</h2>

              {/* Filtro de Termo */}
              <div className="search-filter">
                <input 
                  type="text" 
                  placeholder="Pesquisar..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filtro de Cursos */}
              <div className="curso-filter">
                <select 
                  value={selectedCurso} 
                  onChange={(e) => setSelectedCurso(e.target.value)}
                  className="curso-dropdown"
                >
                  <option value="">Todos os Cursos</option>
                  {cursos.map((curso, index) => (
                    <option key={index} value={curso}>{curso}</option>
                  ))}
                </select>
              </div>
            </div>
            {typeOfUser < 2 && (
              <button onClick={() => setModaCriacaolIsOpen(true)}>Criar Professor</button>
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
                {filteredProfessores.length > 0 && filteredProfessores.slice().reverse().map((professor) => (
                  <tr style={{ maxHeight: '5rem' }} key={professor._id}>
                    <td className='num-edital'>{professor.name}</td>
                    <td className='limit-size objetivo'>{professor.matricula}</td>
                    <td className='limit-size'>{professor.curso}</td>
                    <td className='centralizar-elemento'>{professor.email}</td>
                    <td className='centralizar-elemento'>
                      <img 
                        alt="" 
                        title="Editar" 
                        className='editar' 
                        src={editar} 
                        onClick={() => setModalEdicaoIsOpen(true)} 
                      />
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
  );
};

export default PaginaProfessores;