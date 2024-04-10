import './../PaginaEdital/PaginaEdital.css';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SecoesEdital } from '../../Components/SecoesEdital/SecoesEdital';
import { BuscaProfessor } from '../../Components/BuscaProfessor/BuscaProfessor';

const statusMap = {
    '1':'Aberto',
    '2':'Submissão',
    '3':'Em análise',
    '4':'Aprovado'
}

export const PaginaEdital = () => {
    const { id } = useParams()
    const [editalData, setEditalData] = useState(null)
    const [users, setUsers] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:3001/getEdital/${id}`)
            .then((res) => {
                setEditalData(res.data)
            })
            .catch(error => console.error(error))
    }, [id])

    useEffect(() => {
        axios.get('http://localhost:3001/user/')
            .then((res) => {
                setUsers(res.data)
            })
            .catch(error => console.error(error))
    }, [])

    

    return (
        <div style={{ background: '#DAE7EF', height: '100%' }}>
            <Navbar />

            <div style={{marginLeft: '5%', marginRight: '5%'}}>
                <div className='cabecalho-edital'>
                    <h1>{editalData && editalData.nameEdital}</h1>
                    <strong>Projeto de inovação</strong>
                </div>

                {editalData && (
                    <div className="info-edital">
                        <p><b>Número do edital: </b>{editalData.numeroEdital}</p>
                        <p><b>Criador: </b>{editalData.objetivo}</p>
                        <p><b>Prazo de submissão: </b>{editalData.dataFinal}</p>
                        <p><b>Status atual: </b>{statusMap[editalData.status]}</p>

                        <div className='prof-avaliadores-wrapper'>
                            <h2>Professores avaliadores:</h2>
                            
                                {editalData.profsAvaliadores.length !== 0 ? (
                                    <ul>
                                        <li>Prof 1</li>
                                        <li>Prof 2</li>
                                    </ul>
                                ) : (
                                    <BuscaProfessor />
                                )}
                        </div>
                    </div>
                )}
                <SecoesEdital />
            </div>

        </div>
    )
}