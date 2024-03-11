import { useState } from 'react';
import './ModalCadastro.css';
import axios from 'axios';

export const ModalCadastro = ({setView}) =>{
    //const navigate = useNavigate()

    const [] = useState()
    const [] = useState()
    

   
    
    return(
        <section className="section-modal-card-edital">
            <div className="box-modal-card-edital">
                <div className="box-header-modal-edital">
                    <h1 className="titulo-modal-card-edital">Cadastro de Editais</h1>
                    <button className="button-fechar-modal-edital" onClick={() => setView(null)}>x</button>
                </div>
                <h4 className='instrucao'>Informe o número do edital</h4>
                <input placeholder='Número do edital' className='input-modal'  />
                <h4 className='instrucao'>Informe o titulo do edital</h4>
                <input placeholder='Titulo do Edital' className='input-modal'  />
                <h4 className='instrucao'>Informe a data de inicio para submissão dos projetos</h4>
                <input type="date" placeholder='data de inicio para submissão' class='input-modal' />
                <h4 className='instrucao'>Informe o prazo para submissão dos projetos</h4>
                <input type="date" placeholder='Prazo para submissão' class='input-modal' />
                <h4 className='instrucao'>Descreva o objetivo do Edital</h4>
                <textarea placeholder='Objetivo' class='input-modal input-objetivo'></textarea>
                <div className='box-botoes-modal'>
                <button className='botao-avaliar-contrato' >Criar </button>
                </div>
            </div>
        </section>
    )
    }