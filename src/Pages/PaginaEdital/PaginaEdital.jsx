import './../PaginaEdital/PaginaEdital.css';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SecoesEdital } from '../../Components/SecoesEdital/SecoesEdital';
import { BuscaProfessor } from '../../Components/BuscaProfessor/BuscaProfessor';
import { toast } from 'sonner';
import { TableSubmissoes } from '../../Components/TableSubmissoes/TableSubmissoes';

const statusMap = {
    '1': 'Aberto',
    '2': 'Submissão',
    '3': 'Em análise',
    '4': 'Aprovado'
}

export const PaginaEdital = () => {
    const { id } = useParams()
    const [editalData, setEditalData] = useState(null)
    const [profsAvaliadores, setProfsAvaliadores] = useState([])
    const [requisitos, setRequisitos] = useState([])
    
    useEffect(() => {
        axios.get(`http://localhost:3001/getEdital/${id}`)
            .then((res) => {
                setEditalData(res.data)
                setRequisitos(res.data.requisitosEdital)
            })
            .catch(error => console.error(error))
    }, [id])

    const handleAddAvaliador = (avaliador) => {
        setProfsAvaliadores([...profsAvaliadores, ...avaliador]);
        console.log(avaliador)
    };

    async function handleRemoveProfAvaliador(matricula) {
        try {
            const response = await axios.delete(`http://localhost:3001/getEdital/remove-prof-avaliador/${id}`, {
                data: { matricula }
            });
            const { data } = response;

            // Remova o professor avaliador da lista localmente
            const updatedProfsAvaliadores = profsAvaliadores.filter(prof => prof.matricula !== matricula);
            setProfsAvaliadores(updatedProfsAvaliadores);
            toast.success(data.msg)

            window.location.reload()

        } catch (error) {
            console.error('Erro ao remover professor avaliador:', error);
            // Aqui você pode exibir um toast ou outra mensagem de erro
        }
    }

    return (
        <div style={{ background: '#DAE7EF', height: '100%' }}>
            <Navbar />

            <div style={{ marginLeft: '5%', marginRight: '5%' }}>
                <div className='cabecalho-edital'>
                    <h1>{editalData && editalData.nameEdital}</h1>
                    <strong>Projeto de inovação</strong>
                </div>

                {editalData && (
                    <div className="info-edital">
                        <p><b>Número do edital: </b>{editalData.numeroEdital}</p>
                        <p><b>Objetivo: </b>{editalData.objetivo}</p>
                        <p><b>Prazo de submissão: </b>{editalData.dataFinal}</p>
                        <p><b>Status atual: </b>{statusMap[editalData.status]}</p>

                        <div className='prof-avaliadores-wrapper'>
                            <h2>Professores avaliadores:</h2>
                            <BuscaProfessor onAddAvaliador={handleAddAvaliador} onRemoveAvaliador={handleRemoveProfAvaliador} />

                            <ul className='list-prof-avaliador'>
                                {editalData.profsAvaliadores.map(prof => {
                                    return (
                                        <li key={prof.matricula}>
                                            <div className='wrapper-show-matricula-prof-avaliador'>
                                                <p>{prof.matricula}</p>
                                                <span onClick={() => handleRemoveProfAvaliador(prof.matricula)}>x</span>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>

                        </div>
                    </div>
                )}
                
                <SecoesEdital />

            </div>

        </div>
    )
}
