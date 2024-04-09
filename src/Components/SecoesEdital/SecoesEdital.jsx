import { useEffect, useState } from 'react';
import './SecoesEdital.css'; 
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ValidacaoRequisitosEdital } from '../ValidacaoRequisitosEdital/ValidacaoRequisitosEdital';

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
                <summary>Validação de requisitos</summary>
                <ValidacaoRequisitosEdital />
            </details>
            
            <details>
                <summary>Requisitos</summary>
                <ol>
                    {requisitos !== null &&
                        requisitos.map(requisito => {
                            return <li>{requisito}</li>
                        })}
                </ol>
            </details>

            <details>
                <summary>Avaliações</summary>
                {/*}<AvaliacoesEdital />{*/}
            </details>
        </>
    )
}