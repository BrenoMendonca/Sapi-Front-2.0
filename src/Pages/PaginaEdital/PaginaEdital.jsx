import './../PaginaEdital/PaginaEdital.css';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SecoesEdital } from '../../Components/SecoesEdital/SecoesEdital';

const statusMap = {
    '1':'Aberto',
    '2':'Submissão',
    '3':'Em análise',
    '4':'Aprovado'
}

export const PaginaEdital = () => {
    const { id } = useParams()
    const [editalData, setEditalData] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:3001/getEdital/${id}`)
            .then((res) => {
                setEditalData(res.data)
            })
            .catch(error => console.error(error))
    }, [id])

    return (
        <div style={{background: '#DAE7EF' }}>
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
                    </div>
                )}

                <SecoesEdital />
            </div>

        </div>
    )
}