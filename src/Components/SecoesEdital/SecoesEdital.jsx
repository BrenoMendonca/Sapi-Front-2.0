import { useEffect, useState } from 'react';
import './SecoesEdital.css'; 
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TableSubmissoes } from '../TableSubmissoes/TableSubmissoes';

export const SecoesEdital = () => {
    const { id } = useParams()
 
    const [requisitos, setRequisitos] = useState([])

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

            <h1>SUBMETER AO EDITAL</h1>

            <TableSubmissoes />

        </>
    )
}