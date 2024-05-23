import { useState } from 'react';
import './ModalCadastroEdital.css';
import axios from 'axios';
import { toast } from 'sonner';
import { Trash } from '@phosphor-icons/react';

export const ModalCadastroEdital = ({ setView, atualizarListaEditais }) =>{
    const [edital, setEdital] = useState({
        numeroEdital: '',
        nameEdital: '',
        dataInicio: '',
        dataFinal: '',
        objetivo: '',
        requisitosEdital: [''] // Inicializa com um campo vazio
    });

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        if (name === 'requisitosEdital') {
            const updatedRequisitos = [...edital.requisitosEdital];
            updatedRequisitos[index] = value;
            setEdital({
                ...edital,
                requisitosEdital: updatedRequisitos
            });
        } else {
            setEdital({
                ...edital,
                [name]: value
            });
        }

    };

    const handleAddRequisito = () => {
        setEdital({
            ...edital,
            requisitosEdital: [...edital.requisitosEdital, '']
        });
    };

    const handleRemoveRequisito = (index) => {
        const updatedRequisitos = [...edital.requisitosEdital];
        updatedRequisitos.splice(index, 1);
        setEdital({
            ...edital,
            requisitosEdital: updatedRequisitos
        });
    };

    const createEdital = async () =>{
        const formattedEdital = {
            ...edital,
            dataInicio: edital.dataInicio?.split('-').reverse().join('/'),
            dataFinal: edital.dataFinal?.split('-').reverse().join('/')
        };

        try {
          const response = await axios.post("http://localhost:3001/criacao/edital", formattedEdital);
          atualizarListaEditais();
          toast.success(response.data.msg);
          setView(null);
        } catch (err) {
            toast.error(JSON.stringify(err.response.data.msg));
        }
    };
    
    return(
        <section className="section-modal-card-edital">
            <div className="box-modal-card-edital">
                <div className="box-header-modal-edital">
                    <h1 className="titulo-modal-card-edital">Cadastro de Editais</h1>
                    <button className="button-fechar-modal-edital" onClick={() => setView(null)}>x</button>
                </div>

                <h4 className='instrucao'>Informe o número do edital</h4>
                <input 
                    type='text' 
                    placeholder='Número do edital' 
                    name='numeroEdital' 
                    className='input-modal' 
                    onChange={handleChange} 
                />

                <h4 className='instrucao'>Informe o titulo do edital</h4>
                <input 
                    type='text' 
                    placeholder='Titulo do Edital' 
                    name='nameEdital' 
                    className='input-modal' 
                    onChange={handleChange}  
                />

                <h4 className='instrucao'>Informe a data de inicio para submissão dos projetos</h4>
                <input 
                    type="date" 
                    placeholder='data de inicio para submissão' 
                    name='dataInicio' 
                    className='input-modal' 
                    onChange={handleChange}
                />

                <h4 className='instrucao'>Informe o prazo para submissão dos projetos</h4>
                <input 
                    type="date" 
                    placeholder='Prazo para submissão' 
                    name='dataFinal' 
                    className='input-modal' 
                    onChange={handleChange}
                />

                <h4 className='instrucao'>Descreva o objetivo do Edital</h4>
                <textarea 
                    placeholder='Objetivo'
                    name='objetivo'  
                    className='input-modal input-objetivo' 
                    onChange={handleChange}
                />

                <h4 className='instrucao'>Requisitos do Edital</h4>
                {edital.requisitosEdital.map((requisito, index) => (
                    <div className='input-requisitos-wrapper' key={index}>
                        <input 
                            type='text' 
                            placeholder='Requisito do edital' 
                            name='requisitosEdital' 
                            className='input-modal'
                            value={requisito}
                            onChange={(event) => handleChange(event, index)}
                        />
                        <div>
                            <button onClick={() => handleAddRequisito()}>+</button>
                            <span 
                                onClick={() => handleRemoveRequisito(index)} 
                                className={edital.requisitosEdital.length <= 1 ? 'delete-req-disabled' : ''}
                            >
                                <Trash />
                            </span>
                        </div>
                    </div>
                ))}

                <div className='box-botoes-modal'>
                    <button 
                        className='botao-avaliar-contrato'
                        onClick={() => createEdital()}
                        disabled={!edital.numeroEdital || !edital.nameEdital || !edital.dataInicio || !edital.dataFinal || !edital.objetivo}
                    >
                        Criar
                    </button>
                </div>
            </div>
        </section>
    );
};
