import axios from 'axios';
import './../PaginaSubmissao/PaginaSubmissao.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import { format } from 'date-fns';
import { ValidacaoRequisitosEdital } from '../../Components/ValidacaoRequisitosEdital/ValidacaoRequisitosEdital';

export function PaginaSubmissao() {
    const { idSubmissao } = useParams();
    const [dadosSubmissao, setDadosSubmissao] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/submissoes/${idSubmissao}`)
            .then((response) => {
                setDadosSubmissao(response.data);
                console.log("Dados submissão: ", response.data);
            })
            .catch(error => console.error(error))
    }, [idSubmissao]);

    function formatDate(date) {
        if (!date) return 'Data não disponível';
        const parsedDate = new Date(date);
        if (isNaN(parsedDate)) return 'Data inválida';
        return format(parsedDate, 'dd/MM/yyyy');
    }

    if (!dadosSubmissao) {
        return 
    }

    return (
        <div style={{ background: '#DAE7EF', height: '100%' , paddingBottom: '4rem'}}>
            <Navbar />
            <div className='wrapper-submission-page' style={{ marginLeft: '5%', marginRight: '5%' }}>
                <div className='header-submission'>
                    <h1>Edital número:&nbsp;<span>{dadosSubmissao.edital?.numeroEdital}</span></h1>
                    <strong>{dadosSubmissao.edital?.nameEdital}</strong>
                </div>

                <h2>Informações do projeto:</h2>

                <div className="submission-info">
                    <span>
                        <strong>Título: </strong><p>{dadosSubmissao.title}</p>
                    </span>
                    <span>
                        <strong>Descrição: </strong><p>{dadosSubmissao.description}</p>
                    </span>
                    <span>
                        <strong>Professor líder: </strong><p>{dadosSubmissao.prof?.name} - {dadosSubmissao.prof?.matricula}</p>
                    </span>
                    <span>
                        <strong>Data da submissão: </strong><p>{formatDate(dadosSubmissao.createdAt)}</p>
                    </span>
                    <span>
                        <strong>Status atual: </strong><p>A definir</p>
                    </span>
                </div>

                <ValidacaoRequisitosEdital />
            </div>
        </div>
    );
}
