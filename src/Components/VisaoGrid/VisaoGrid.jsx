import '../VisaoGrid/VisaoGrid.css'
import { useState, useEffect } from "react";
import axios from 'axios';
import { Load } from '../../Components/Load/Load'
import { Status } from '../../Components/Status/Status';
import { Link, useNavigate } from "react-router-dom";
// Importando imagens
import editar from '../../Assets/escrever.png';
import vizualizar from '../../Assets/olho.png';

import {ModalProfessores} from '../../Components/ModalProfessores/ModalProfessores'
import { ModalEdicaoProfessor } from '../../Components/ModalEdicaoProfessor/ModalEdicaoProfessor';


export const VisaoGrid = ({ editais = [] }) => {
  const [modalCriacaoIsOpen, setModalCriacaoIsOpen] = useState(false);
  const [modalEdicaoIsOpen, setModalEdicaoIsOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [typeOfUser, setTypeOfUser] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const editaisPerPage = 12; // Definindo 12 itens por página

  const getTypeOfUser = async () => {
    const lsSession = JSON.parse(localStorage.getItem('session'));
    if (!lsSession || !lsSession.matricula) return;
    try {
      const response = await axios.get(`http://localhost:3001/user/search-users?mat=${lsSession.matricula}`);
      if (response.data && response.data.length > 0) setTypeOfUser(response.data[0].typeOfUser);
    } catch (error) {
      console.error("Erro ao buscar tipo de usuário:", error);
    }
  };

  const getProfessorByMatricula = async (matricula) => {
    try {
      const response = await axios.get(`http://localhost:3001/user/matricula/${matricula}`);
      setSelectedProfessor(response.data);
      setModalEdicaoIsOpen(true);
    } catch (error) {
      console.error("Erro ao buscar professor:", error);
    }
  };

  useEffect(() => {
    getTypeOfUser();
  }, []);

  // Lógica para determinar itens da página atual
  const indexOfLastEdital = currentPage * editaisPerPage;
  const indexOfFirstEdital = indexOfLastEdital - editaisPerPage;
  const currentEditais = editais.slice().reverse().slice(indexOfFirstEdital, indexOfLastEdital);

  // Função para navegar para uma página específica
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='BackgroundPaginaInicio'>
      <div className="container">
        <div className="divTable">
          <table className='table-itens'>
            <thead>
              <tr>
                <th className='titulo-crud'>Num edital</th>
                <th className='titulo-crud'>Titulo do Edital</th>
                <th className='titulo-crud'>Prazo</th>
                <th className='titulo-crud'>Status</th>
                <th className="titulo-crud-options">Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentEditais.length > 0 ? (
                currentEditais.map((edital) => (
                  <tr key={edital._id}>
                    <td className='numero-itens'>{edital.numeroEdital}</td>
                    <td className='titulo-edital-itens'>{edital.nameEdital}</td>
                    <td className='prazo-itens'>{edital.dataFinal}</td>
                    <td className='status-itens'><Status status={edital.status} /></td>
                    <td className='centralizar-elemento'>
                      <Link to={`/edital/${edital._id}`}>
                        <img alt="Ver mais informações" className='visualizar' src={vizualizar}></img>
                      </Link>
                      <img alt="Editar" className='editar' src={editar}></img>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="loading-cell">
                    <div className="loading-container">
                      {load && <Load />}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Navegação de Paginação */}
          <div className="pagination">
            <button className="pagination-arrow" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
            {Array.from({ length: Math.ceil(editais.length / editaisPerPage) }, (_, index) => (
              <button 
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
            <button className="pagination-arrow" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(editais.length / editaisPerPage)}>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaoGrid;