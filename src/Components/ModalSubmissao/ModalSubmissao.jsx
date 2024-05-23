    import axios from "axios";
import { useState } from "react";

    export function ModalSubmissao(/*{ setViewModalOfSubmissions, updateSubmissions }*/) {
        const [submissao, setSubmissao] = useState({
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
                const response = await axios.post("http://localhost:3001/criacao/edital", submissao);
                console.log(response.data);
            } catch (err) {
                console.log(JSON.stringify(err.response.data.msg));
            }
        };
        console.log(submissao)
        return (
            <form action="." method="post" onSubmit={createSubmission}>
                <label htmlFor="matricula">Matrícula do professor</label>
                <input 
                    type="text" 
                    id="matricula"
                    value={submissao.matricula}
                    onChange={handleChange}
                />

                <label htmlFor="title">Título do projeto</label>
                <input 
                    type="text" 
                    value={submissao.title}
                    onChange={handleChange}
                    id="title" 
                />

                <label htmlFor="description">Descrição</label>
                <textarea 
                    name="description" 
                    value={submissao.description}
                    onChange={handleChange}
                    id="description"
                ></textarea>

                {/*<label htmlFor="">Projeto de pesquisa (PDF)</label>
                <input type="file" name="" id="" />

                <label htmlFor="">Comprovante Comitê de Ética (se aplicável)</label>
                <input type="file" name="" id="" />*/}

                <button type="submit">Submeter</button>
            </form>
        )
    }