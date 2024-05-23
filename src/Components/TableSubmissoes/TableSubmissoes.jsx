import { useEffect, useState } from "react";
import "./../TableSubmissoes/TableSubmissoes.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns'
import { Load } from "../Load/Load";

export function TableSubmissoes() {
    const { id } = useParams();
    const [submissoes, setSubmissoes] = useState([]);
    const [load, setLoad] = useState(false);

    async function getSubmissoes() {
        setLoad(true);
        try {
            const response = await axios.get(
                `http://localhost:3001/getEdital/${id}/submissoes/`
            );

            const data = response.data;

            setSubmissoes(data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoad(false);
        }
    }
    
    useEffect(() => {
        getSubmissoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function setDateFormat(date) {
        return format(new Date(date), 'dd/MM/yyyy');
    }
    return (
        <table className="table-submissoes-wrapper">
            <thead>
                <tr>
                    <th className="titulo-crud col-sub-num">Número</th>
                    <th className="titulo-crud col-sub-date">Data de submissão</th>
                    <th className="titulo-crud col-sub-title">Título</th>
                </tr>
            </thead>
            <tbody>
                {submissoes !== null &&
                    submissoes
                        .slice()
                        .map((submissao, index) => (
                            <tr>
                                    <td className="select-submission">
                                        <Link to={`/edital/${submissao.edital}/submissao/${submissao._id}`}>
                                            {index+1}
                                        </Link> 
                                    </td>
                                <td>{setDateFormat(submissao.createdAt)}</td>
                                <td>{submissao.title}</td>
                            </tr>
                        ))
                }

                <tr>
                    <td colSpan="6" className="loading-cell">
                        <div className="loading-container">{load && <Load />}</div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
