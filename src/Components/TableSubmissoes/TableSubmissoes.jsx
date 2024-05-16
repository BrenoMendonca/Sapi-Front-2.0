import { useEffect, useState } from "react";
import "./../TableSubmissoes/TableSubmissoes.css";
import { useParams } from "react-router-dom";
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
    }, getSubmissoes);

    function setDateFormat(date) {
        return format(new Date(date), 'dd/MM/yyyy');
    }
    return (
        <table>
            <thead>
                <tr>
                    <th className="titulo-crud">Número</th>
                    <th className="titulo-crud">Título</th>
                    <th className="titulo-crud">Data de submissão</th>
                </tr>
            </thead>
            <tbody>
                {submissoes !== null &&
                    submissoes
                        .slice()
                        .reverse()
                        .map((submissao, index) => (
                            <tr>
                                <td>{index+1}</td>
                                <td>{submissao.title}</td>
                                <td>{setDateFormat(submissao.createdAt)}</td>
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
