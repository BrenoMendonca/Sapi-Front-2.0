import { useEffect, useState } from "react";
import "./../TableSubmissoes/TableSubmissoes.css";
import { useParams } from "react-router-dom";
import axios from "axios";
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

            console.log(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoad(false);
        }
    }
    useEffect(() => {
        getSubmissoes();
    }, getSubmissoes);

    return (
        <table>
            <thead>
                <tr>
                <th className="titulo-crud">Num Edital</th>
                <th className="titulo-crud">Objetivo</th>
                <th className="titulo-crud">Titulo do Edital</th>
                <th className="titulo-crud centralizar-elemento">Prazo para envio</th>
                <th className="titulo-crud centralizar-elemento">Status</th>
                <th className="titulo-crud centralizar-elemento">Ações</th>
                </tr>
            </thead>
            <tbody>
                {submissoes !== null &&
                    submissoes
                        .slice()
                        .reverse()
                        .map((submissao) => (
                            <td>{submissao.title}</td>
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
