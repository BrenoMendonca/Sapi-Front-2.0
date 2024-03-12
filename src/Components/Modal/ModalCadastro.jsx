import { useState } from 'react';
import './ModalCadastro.css';
import axios from 'axios';

export const ModalCadastro = ({setView}) =>{
    //const navigate = useNavigate()

    const [edital, setEdital] = useState([])
    const [loading, setLoading] = useState()

    const createEdital = async (event) =>{
       

        
        try{
          const response = await axios.post ("http://localhost:3001/criacao/edital", edital)

          const data = response.data; 
          console.log(data)
          alert(JSON.stringify(response.data.msg))
        }catch (err){
            alert(JSON.stringify(err.response.data.msg))

        }
    }
    
    const handleChange = (event) => {
        console.log('Digitando...', event.target.name, event.target.value);
        setEdital({ ...edital, [event.target.name]: event.target.value });
        console.log('Form', edital);
    }
   
   
    
    return(
        <section className="section-modal-card-edital">
            <div className="box-modal-card-edital">
                <div className="box-header-modal-edital">
                    <h1 className="titulo-modal-card-edital">Cadastro de Editais</h1>
                    <button className="button-fechar-modal-edital" onClick={() => setView(null)}>x</button>
                </div>
                <h4 className='instrucao'>Informe o número do edital</h4>
                <input 
                    placeholder='Número do edital' 
                    className='input-modal' 
                    name = 'numeroEdital' 
                    type = 'text' 
                    onChange={handleChange} 
                />
                <h4 className='instrucao'>Informe o titulo do edital</h4>
                <input 
                    placeholder='Titulo do Edital' 
                    className='input-modal' 
                    name = 'nameEdital' 
                    type = 'text' 
                    onChange={handleChange}  
                />
                <h4 className='instrucao'>Informe a data de inicio para submissão dos projetos</h4>
                <input 
                    type="date" 
                    placeholder='data de inicio para submissão' 
                    name = 'dataInicio' 
                    class='input-modal' 
                    onChange={handleChange}
                />
                <h4 className='instrucao'>Informe o prazo para submissão dos projetos</h4>
                <input 
                    type="date" 
                    placeholder='Prazo para submissão' 
                    class='input-modal' 
                    name = 'dataFinal' 
                    onChange={handleChange}
                />
                <h4 className='instrucao'>Descreva o objetivo do Edital</h4>
                <textarea 
                    placeholder='Objetivo' 
                    class='input-modal input-objetivo' 
                    name = 'objetivo' 
                    onChange={handleChange}>
                </textarea>
                <div className='box-botoes-modal'>
                <button className='botao-avaliar-contrato'onClick={()=> {createEdital(); setView(null);}} >Criar </button>
                </div>
            </div>
        </section>
    )
    }