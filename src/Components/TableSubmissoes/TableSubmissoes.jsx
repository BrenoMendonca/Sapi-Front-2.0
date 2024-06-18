import "./../TableSubmissoes/TableSubmissoes.css";
import { Link } from "react-router-dom";
import { format } from 'date-fns'

export function TableSubmissoes({ submissoes }) {
    function setDateFormat(date) {
        if (!date) return 'Data não disponível';
        const parsedDate = new Date(date);
        if (isNaN(parsedDate)) return 'Data inválida';
        return format(parsedDate, 'dd/MM/yyyy');   
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
            </tbody>
        </table>
    );
}
