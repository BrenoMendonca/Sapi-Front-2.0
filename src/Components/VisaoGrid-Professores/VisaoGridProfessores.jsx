import '../VisaoGrid-Professores/VisaoGridProfessores.css'
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


export const VisaoGridProfessores = ({ professores = [] }, atualizarProfessores) => {

  // Modal de edição de professores  
  const [modalEdicaoIsOpen, setModalEdicaoIsOpen] = useState(false);

  //Load da grid
  const [load, setLoad] = useState(false);

  //Verificação de tipo de usuário
  const [typeOfUser, setTypeOfUser] = useState(null);
  
  //Carregar dados do modal de professores
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBlock, setCurrentBlock] = useState(0); // Bloco inicial   
  const professoresPerPage = 12; // Definindo 12 itens por página
  const totalPages = Math.ceil(professores.length / professoresPerPage);  


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
      //Abre o modal de edição
      setModalEdicaoIsOpen(true);
    } catch (error) {
      console.error("Erro ao buscar professor:", error);
    }
  };

  useEffect(() => {
    getTypeOfUser();
  }, []);


  // Lógica para determinar itens da página atual
  const indexOfLastEdital = currentPage * professoresPerPage;
  const indexOfFirstEdital = indexOfLastEdital - professoresPerPage;
  const currentEditais = professores.slice().reverse().slice(indexOfFirstEdital, indexOfLastEdital);

  // Lógica para navegar entre os blocos
  const paginate = (page) => {
  setCurrentPage(page);
  
  const newBlock = Math.floor((page - 1) / professoresPerPage);
  setCurrentBlock(newBlock);
    };
  
    // Exibir um bloco de 12 páginas baseado no bloco atual
  const startPage = currentBlock * professoresPerPage + 1;
  const endPage = Math.min(startPage + professoresPerPage - 1, totalPages);

  return (
    <div className='BackgroundPaginaInicio'>
        {modalEdicaoIsOpen && (
                <ModalEdicaoProfessor setView={setModalEdicaoIsOpen} professor={selectedProfessor}  atualizarListaProfessores={atualizarProfessores} />
            )}
      <div className="container">
        <div className="divTable">
          <table className='table-itens'>
            <thead>
              <tr>
                <th className='titulo-crud'>Nome</th>
                <th className='titulo-crud'>Matricula</th>
                <th className='titulo-crud'>Curso</th>
                <th className='titulo-crud'>Email</th>
                <th className="titulo-crud-options">Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentEditais.length > 0 ? (
                currentEditais.map((professor) => (
                  <tr key={professor._id}>
                    <td className='numero-itens'>{professor.name}</td>
                    <td className='titulo-edital-itens'>{professor.matricula}</td>
                    <td className='prazo-itens'>{professor.curso}</td>
                    <td className='status-itens'>{professor.email}</td>
                    <td className='centralizar-elemento'>
                      <Link to={`/edital/${professor._id}`}>
                        <img alt="Ver mais informações" className='visualizar' src={vizualizar}></img>
                      </Link>
                      <img alt="Editar" className='editar' src={editar} onClick={() => getProfessorByMatricula(professor.matricula)}></img>
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
                <button
                className="pagination-arrow"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                >
                &lt;
                </button>

                {/* Páginas do bloco atual */}
                {Array.from({ length: professoresPerPage }, (_, index) => {
                const pageNumber = startPage + index;
                return (
                    <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
                    disabled={pageNumber > totalPages}
                    >
                    {pageNumber}
                    </button>
                );
                })}

                <button
                className="pagination-arrow"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                >
                &gt;
                </button>
            </div>

        </div>
      </div>
    </div>
  );
};

export default VisaoGridProfessores;