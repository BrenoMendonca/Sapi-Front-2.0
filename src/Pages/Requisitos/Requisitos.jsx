import React, { useState } from 'react';
import Apresentacao from '../../Components/Apresentacao/Apresentacao';
import Navbar from '../../Components/Navbar/Navbar';
import './../Requisitos/Requisitos.css';

const Requisitos = () => {
  const [requisitos, setRequisitos] = useState([]);
  const [novoRequisito, setNovoRequisito] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [originalRequisitos, setOriginalRequisitos] = useState([]);

  const adicionarRequisito = () => {
    if (novoRequisito.trim() !== '') {
      setRequisitos([...requisitos, novoRequisito]);
      setNovoRequisito('');
    }
  };

  const removerRequisito = (index) => {
    const novosRequisitos = requisitos.filter((_, i) => i !== index);
    setRequisitos(novosRequisitos);
  };

  const startEditing = () => {
    setOriginalRequisitos(requisitos);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setRequisitos(originalRequisitos);
    setIsEditing(false);
  };

  const saveEditing = () => {
    setIsEditing(false);
  };

  return (
    <div className="PaginaInicio">
      <Navbar />
      <Apresentacao />
      <div className='BackgroundPaginaInicio'>
        <div style={{padding: '2rem 1rem'}} className="container">
          <div className="reqs-padrao-info">
            <p>Nessa seção, coordenadores podem criar requisitos padrão para todos os editais. Ao criar um edital, esses requisitos automaticamente estarão listados.</p>
            <p>Esses requisitos podem ser alterados, e as mudanças só irão ser refletidas no cadastro de novos editais.</p>
          </div>
          <div className="requisitos-padrao">
            {!isEditing && (
              <button className='alterar-reqs-padrao' onClick={startEditing}>
                Alterar requisitos
              </button>
            )}
            {isEditing && (
              <div style={{display: 'flex',alignItems: 'center', gap: '1rem' }}>
                <input
                  type="text"
                  value={novoRequisito}
                  onChange={(e) => setNovoRequisito(e.target.value)}
                  placeholder="Digite um novo requisito"
                  className='req-padrao-input'
                />
                <button className='add-req-padrao' onClick={adicionarRequisito}>Adicionar</button>
              </div>
            )}
            <ul className='req-padrao-list'>
              {requisitos.map((requisito, index) => (
                <li className='req-padrao-item' key={index}>
                  {requisito}
                  {isEditing && <button className="remove-req-padrao" onClick={() => removerRequisito(index)}>Remover</button>}
                </li>
              ))}
            </ul>
            {isEditing && (
              <>
                <button className='save-reqs-padrao' onClick={saveEditing}>Salvar requisitos</button>
                <button className='cancelar-reqs-padrao' onClick={cancelEditing}>Cancelar todas as alterações</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requisitos;
