import { useEffect, useState } from 'react';
import './SecoesEdital.css'; 
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TableSubmissoes } from '../TableSubmissoes/TableSubmissoes';
import { ModalSubmissao } from '../ModalSubmissao/ModalSubmissao';

export const SecoesEdital = () => {
    const { id } = useParams()
    const [requisitos, setRequisitos] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [submissoes, setSubmissoes] = useState([]);

    useEffect(()=>{
        const getRequisitos = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/getEdital/${id}`)
                const data = response.data.requisitosEdital;
                setRequisitos(data);
            } catch(error) {
                console.error(error);
            }
        }
    
        getRequisitos();
    },[id])

    async function getSubmissoes() {
        try {
            const response = await axios.get(
                `http://localhost:3001/getEdital/${id}/submissoes/`
            );

            const data = response.data;

            setSubmissoes(data);

        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        getSubmissoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    return (
        <>  
            <details>
                <summary>Requisitos</summary>
                <ol>
                    {requisitos !== null &&
                        requisitos.map((requisito, i) => {
                            return <li key={i}>{requisito}</li>
                        })}
                </ol>
            </details>

            <div className="header-table-submissions">
                <h1>Submissões realizadas:</h1> 
                <button onClick={openModal}>Submeter ao edital</button>
            </div>
            <TableSubmissoes submissoes={submissoes} />

            {isModalOpen && <ModalSubmissao closeModal={closeModal} atualizarListaSubmissoes={getSubmissoes} />}
        </>
    )
}