import './../Status/Status.css'

export const Status = (props) => {
    const statusMap = {
        '1': { text: 'Aberto', cssClass: 'status-aberto', color: '#007bff' },
        '2': { text: 'Submissão', cssClass: 'status-submissao', color: '#e6b400' },
        '3': { text: 'Em análise', cssClass: 'status-analise', color: '#FFB302' },
        '4': { text: 'Aprovado', cssClass: 'status-aprovado', color: '#56F000' }
    };

    const { text, cssClass, color } = statusMap[props.status] || {};

    return (
        <span className={cssClass}>
            <span className='status-ball' style={{ background: color }}></span>
            <p>{text}</p>
        </span>
    );
}
