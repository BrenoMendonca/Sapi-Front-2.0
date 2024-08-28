    import axios from "axios";
    import { useEffect, useState } from "react";
    import './ModalSubmissao.css'
    import { useParams } from "react-router-dom";
    import { toast } from "sonner";

    export function ModalSubmissao({ closeModal, atualizarListaSubmissoes }) {
        const { id } = useParams()
        const [submissao, setSubmissao] = useState({
            edital: id,
            matricula: '',
            title: '',
            description: '',
        });
        const [matricula, setMatricula] = useState('');

        const handleChange = (event) => {
            const { id, value } = event.target;
            setSubmissao(prevState => ({
                ...prevState,
                [id]: value
            }));
        };

        const createSubmission = async (event) => {
            event.preventDefault();
            
            try {
                const response = await axios.post("http://localhost:3001/submissao", submissao);
                toast.success(response.data.msg);
                atualizarListaSubmissoes()
                closeModal()
            } catch (err) {
                toast.error(JSON.stringify(err.response.data.msg));
            }
        };

        useEffect(() => {
            const sessionData = JSON.parse(localStorage.getItem('session'));
        
            // Se houver dados e a matrícula estiver presente, armazena na variável de estado
            if (sessionData && sessionData.matricula) {
                setMatricula(sessionData.matricula);
        }
        }, [])

        return (

            <div className="modal-backdrop" onClick={closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="submit-to-edital-header">
                        <h1>Submeter ao Edital</h1>
                        <button className="modal-close" onClick={closeModal}>x</button>
                    </div>

                    <form className="submission-model-form" action="." method="post" onSubmit={createSubmission}>
                        <div>
                            <label htmlFor="matricula">Matrícula</label>
                            <input 
                                type="text" 
                                id="matricula"
                                value={matricula} 
                                readonly="true"
                                className="submission-input matricula-input"
                                onChange={handleChange}
                                style={{backgroundColor: '', color: '#777'}}
                            />
                        </div>

                        <div>    
                            <label htmlFor="title">Título do projeto</label>
                            <input 
                                type="text" 
                                value={submissao.title}
                                className="submission-input"
                                onChange={handleChange}
                                id="title" 
                            />
                        </div>

                        <div>
                            <label htmlFor="description">Descrição</label>
                            <textarea 
                                name="description" 
                                value={submissao.description}
                                onChange={handleChange}
                                id="description"
                                className="submission-input"
                            ></textarea>
                        </div>

                        <label htmlFor="">Projeto de pesquisa (PDF)</label>
                        <input type="file" name="" id="" />

                        <label htmlFor="">Comprovante Comitê de Ética (se aplicável)</label>
                        <input type="file" name="" id="" />

                        <button type="submit">Submeter</button>
                    </form>
                </div>
            </div>
        )
    }