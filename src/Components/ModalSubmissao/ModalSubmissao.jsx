    import axios from "axios";
    import { useState } from "react";
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
                console.log(response.data)
            } catch (err) {
                toast.error(JSON.stringify(err.response.data.msg));
            }
        };

        return (

            <div className="modal-backdrop" onClick={closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="submit-to-edital-header">
                        <h1>Submeter ao Edital</h1>
                        <button className="modal-close" onClick={closeModal}>x</button>
                    </div>

                    <form className="submission-model-form" action="." method="post" onSubmit={createSubmission}>
                        <div>
                            <label htmlFor="matricula">Matrícula do professor</label>
                            <input 
                                type="text" 
                                id="matricula"
                                value={submissao.matricula}
                                className="submission-input"
                                onChange={handleChange}
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

                        {/*<label htmlFor="">Projeto de pesquisa (PDF)</label>
                        <input type="file" name="" id="" />

                        <label htmlFor="">Comprovante Comitê de Ética (se aplicável)</label>
                        <input type="file" name="" id="" />*/}

                        <button type="submit">Submeter</button>
                    </form>
                </div>
            </div>
        )
    }