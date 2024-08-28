import './../Status/Status.css'

export const Status = (props) => {
    const statusMap = {
        '1': { text: 'Aberto', cssClass: 'status-aberto', color: '#007bff' },
        '2': { text: 'Submissão', cssClass: 'status-submissao', color: '#FFFF00' },
        '3': { text: 'Em análise', cssClass: 'status-analise', color: '#ffa500' },
        '4': { text: 'Aprovado', cssClass: 'status-aprovado', color: '#56F000' },
        '5': { text: 'Reprovado', cssClass: 'status-reprovado', color: '#d7584f' },
        '6': { text: 'Não aceita mais candidaturas', cssClass: 'status-finalizado', color: '#555' },
        '7': { text: 'Finalizado', cssClass: 'status-finalizado', color: '#bbb' },
    };

    const { text, cssClass, color } = statusMap[props.status] || {};

    return (
        <span className={cssClass}>
            <span className='status-ball' style={{ background: color }}></span>
            <p>{text}</p>
        </span>
    );
}
