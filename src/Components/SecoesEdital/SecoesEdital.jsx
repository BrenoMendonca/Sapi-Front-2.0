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
    const [typeOfUser, setTypeOfUser] = useState(null)

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
    const getTypeOfUser = async () => {
        const lsSession = JSON.parse(localStorage.getItem('session'));
        if (!lsSession || !lsSession.matricula) {
            console.error("Sessão inválida ou sem matrícula");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:3001/user/search-users?mat=${lsSession.matricula}`);
            if (response.data && response.data.length > 0) {
                setTypeOfUser(response.data[0].typeOfUser);
            } else {
                console.error("Usuário não encontrado ou resposta inesperada da API");
            }
        } catch (error) {
            console.error("Erro ao buscar o tipo de usuário", error);
        }   
    }
    
    useEffect(() => {
        getSubmissoes();
        getTypeOfUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function openModal() {
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
                <div>
                    {(typeOfUser === 0 || typeOfUser === 100) && (
                        <button onClick={openModal}>Submeter ao edital</button>
                    )}
                </div>
            </div>
            <TableSubmissoes submissoes={submissoes} />

            {isModalOpen && <ModalSubmissao closeModal={closeModal} atualizarListaSubmissoes={getSubmissoes} />}
        </>
    )
}