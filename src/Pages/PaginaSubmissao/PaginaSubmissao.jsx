import axios from 'axios';
import './../PaginaSubmissao/PaginaSubmissao.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function PaginaSubmissao() {
    const { idSubmissao } = useParams()
    const [ dados, setDados ] = useState({})
    
    useEffect(() => {
        axios.get(`http://localhost:3001/submissoes/${idSubmissao}`)
            .then((response) => {
                setDados(response.data)
                console.log(response.data)
            })
            .catch(error => console.error(error))

    }, [idSubmissao])

    return (
        <h1>{dados.title}</h1>
    )
}