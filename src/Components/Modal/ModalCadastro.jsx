import { useState } from 'react';
import './ModalCadastro.css';
import axios from 'axios';
import { toast } from 'sonner';


export const ModalCadastro = ({ setView, atualizarListaEditais }) =>{
    //const navigate = useNavigate()

    const [edital, setEdital] = useState([])
    const [loading, setLoading] = useState()

    const createEdital = async (event) =>{
        try{
          const response = await axios.post ("http://localhost:3001/criacao/edital", edital)

          const data = response.data; 
          console.log(data)
         
          
          //alert(JSON.stringify(response.data.msg))
          atualizarListaEditais()
          toast.success('Edital criado com sucesso!')


          setView(null)

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
                    type = 'text' 
                    placeholder='Número do edital' 
                    name = 'numeroEdital' 
                    className='input-modal' 
                    onChange={handleChange} 
                />
                <h4 className='instrucao'>Informe o titulo do edital</h4>
                <input 
                    type = 'text' 
                    placeholder='Titulo do Edital' 
                    name = 'nameEdital' 
                    className='input-modal' 
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
                    name = 'dataFinal' 
                    class='input-modal' 
                    onChange={handleChange}
                />
                <h4 className='instrucao'>Descreva o objetivo do Edital</h4>
                <textarea 
                    placeholder='Objetivo'
                    name = 'objetivo'  
                    class='input-modal input-objetivo' 
                    onChange={handleChange}>
                </textarea>
                <div 
                    className='box-botoes-modal'>
                        <button 
                        className='botao-avaliar-contrato'
                        onClick={()=> {createEdital()}} >
                        Criar </button>
                </div>
            </div>
        </section>
    )
    }