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
                        requisitos.map(requisito => {
                            return <li>{requisito}</li>
                        })}
                </ol>
            </details>

            <div class="header-table-submissions">
                <h1>Submissões realizadas:</h1> 
                <button onClick={openModal}>Submeter ao edital</button>
            </div>
            <TableSubmissoes />

            {isModalOpen && <ModalSubmissao closeModal={closeModal}/>}
        </>
    )
}