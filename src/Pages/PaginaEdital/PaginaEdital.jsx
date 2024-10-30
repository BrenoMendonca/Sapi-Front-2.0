import './../PaginaEdital/PaginaEdital.css';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SecoesEdital } from '../../Components/SecoesEdital/SecoesEdital';
import { BuscaProfessor } from '../../Components/BuscaProfessor/BuscaProfessor';
import { toast } from 'sonner';
import Apresentacao from '../../Components/Apresentacao/Apresentacao';
import { Status } from '../../Components/Status/Status';


const statusMap = {
    '1': 'Aberto',
    '2': 'Submissão',
    '3': 'Em análise',
    '4': 'Aprovado'
}

export const PaginaEdital = () => {
    const [editais, setEditais] = useState([]);
    const [load, setLoad] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const editaisPerPage = 9;
  
    const getEditais = async () => {
      setLoad(true);
      try {
        const response = await axios.get("http://localhost:3001/getEdital/");
        const data = response.data;
        setEditais(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoad(false);
      }
    };
  
    const indexOfLastEdital = currentPage * editaisPerPage;
    const indexOfFirstEdital = indexOfLastEdital - editaisPerPage;
    const currentEditais = editais.slice().reverse().slice(indexOfFirstEdital, indexOfLastEdital);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    useEffect(() => {
      getEditais();
    }, []);
  
    return (
      <div className='Background-editais'>
        <Navbar />
        <Apresentacao />
        
        <div className="edital-grid">
          {load ? (
            <p>Carregando...</p>
          ) : (
            currentEditais.map((edital) => (
              <div key={edital._id} className="edital-card">
                <h3 className="edital-title">{edital.nameEdital}</h3>
                <p className="edital-number">{edital.numeroEdital}</p>
                <p><Status status={edital.status}/></p>
                {/* Botão de mais opções posicionado no canto inferior direito */}
                <div className="options-menu">
                  <button className="options-button">⋮</button>
                  <ul className="options-dropdown">
                    <li>Visualizar edital</li>
                    <hr/>
                    <li>Editar edital</li>
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Navegação de Paginação */}
        <div className="pagination">
          <button className= "pagination-arrow " onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
          {Array.from({ length: Math.ceil(editais.length / editaisPerPage) }, (_, index) => (
            <button 
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
          <button className= "pagination-arrow " onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(editais.length / editaisPerPage)}>&gt;</button>
        </div>
      </div>
    );
  };