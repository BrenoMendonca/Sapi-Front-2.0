import axios from 'axios';
import './../PaginaSubmissao/PaginaSubmissao.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import { format } from 'date-fns';
import { ValidacaoRequisitosSubmissao } from '../../Components/ValidacaoRequisitosSubmissao/ValidacaoRequisitosSubmissao';
import { AvaliacaoSubmissao } from '../../Components/AvaliacaoSubmissao/AvaliacaoSubmissao';

export function PaginaSubmissao() {
    const { idSubmissao } = useParams();
    const [dadosSubmissao, setDadosSubmissao] = useState(null);
    const [typeOfUser, setTypeOfUser] = useState(null)
    const [areReqsValidated, setAreReqsValidated] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:3001/submissoes/${idSubmissao}`)
            .then((response) => {
                setDadosSubmissao(response.data);
            })
            .catch(error => console.error(error))

        getTypeOfUser()
        getAreValidatedReqs()
    }, [idSubmissao]);

    function formatDate(date) {
        if (!date) return 'Data não disponível';
        const parsedDate = new Date(date);
        if (isNaN(parsedDate)) return 'Data inválida';
        return format(parsedDate, 'dd/MM/yyyy');
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

    const getAreValidatedReqs = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/submissoes/${idSubmissao}`)

            if (response.data && response.data.areReqsValidated !== false) {
                setAreReqsValidated(true)
            }
        } catch (e) {
            console.error("erro: ", e)
        }
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
                    <div className="info">
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
                    {typeOfUser && typeOfUser >= 1 ? (
                        <div className="validacao-requisitos-wrapper-pag-sub">
                            <h2>Validação de Requisitos</h2>
                            <small>Exclusivo Coordenação</small>
                            <ValidacaoRequisitosSubmissao />
                            {areReqsValidated && (
                                <p className='reqs-ja-validados'>
                                    Requisitos já foram validados. Caso deseje invalidá-los, clique em <strong>Validar Requisitos</strong> e, em seguida, <strong>Invalidar Requisitos</strong>.
                                </p>
                            )}
                        </div>
                    ) : <></>
                    }
                </div>

                <div style={{marginTop: '2rem'}}>
                    <AvaliacaoSubmissao />
                </div>
                
                
            </div>
        </div>
    );
}
