import '../VisaoCard/VisaoCard.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Apresentacao from '../../Components/Apresentacao/Apresentacao';
import { Status } from '../../Components/Status/Status';



export const VisaoCard = ({ editais = [] }) => {
    
    const [load, setLoad] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const editaisPerPage = 9;
  
  
    const indexOfLastEdital = currentPage * editaisPerPage;
    const indexOfFirstEdital = indexOfLastEdital - editaisPerPage;
    const currentEditais = editais.slice().reverse().slice(indexOfFirstEdital, indexOfLastEdital);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    return (
      <div className='Background-editais'>
        
        <div className="edital-grid">
          {load ? (
            <p>Carregando...</p>
          ) : (
            currentEditais.map((edital) => (
              <div key={edital._id} className="edital-card">
                <h3 className="edital-title">{edital.nameEdital}</h3>
                <p className="edital-number">Num edital: {edital.numeroEdital}</p>
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