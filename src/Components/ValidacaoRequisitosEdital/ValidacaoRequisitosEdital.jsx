import './ValidacaoRequisitosEdital.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ValidacaoRequisitosEdital = () => {
    const { id } = useParams();
    const localStorageKey = `checkboxStatus_${id}`; // Chave única para o localStorage
 
    const [requisitos, setRequisitos] = useState([]);
    const [checkboxStatus, setCheckboxStatus] = useState({});
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    // Carrega os requisitos e o estado dos checkboxes do localStorage ao montar o componente
    useEffect(() => {
        const getRequisitos = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/getEdital/${id}`);
                const data = response.data.requisitosEdital;
                setRequisitos(data);

                const localStorageData = JSON.parse(localStorage.getItem(localStorageKey)) || {};
                setCheckboxStatus(localStorageData);
            } catch(error) {
                console.error(error);
            }
        };
    
        getRequisitos();
    }, [id, localStorageKey]); // Adicionamos 'localStorageKey' como dependência

    // Atualiza o estado dos checkboxes e o localStorage ao marcar/desmarcar um checkbox
    const handleCheckboxChange = (event) => {
        const { id } = event.target;
        const isChecked = event.target.checked;

        // Atualiza o estado do checkboxStatus para refletir o novo status do checkbox
        setCheckboxStatus(prevStatus => ({
            ...prevStatus,
            [id]: isChecked
        }));

        // Atualiza o localStorage com os dados atualizados dos checkboxes
        const updatedCheckboxStatus = {
            ...checkboxStatus,
            [id]: isChecked
        };
        localStorage.setItem(localStorageKey, JSON.stringify(updatedCheckboxStatus));
    };

    const handleValidateButtonClick = () => {
        setIsConfirmationOpen(true);
    };

    const handleConfirmationOK = async (event) => {
        event.preventDefault()

        try {
            console.log('antes da chamada')
            console.log(id)
            await axios.patch(`http://localhost:3001/getEdital/validate-requisitos/${id}`)
                .then((response) => {
                    console.log(response.data)
                });
            console.log('dps da chamada')

        } catch (error) {
            console.error('Erro ao validar requisitos:', error);
            if (error.response) {
                console.error('Detalhes do erro:', error.response.data);
            }        
        }
    };

    const handleConfirmationCancel = () => {
        setIsConfirmationOpen(false);
    };

    // Verifica se todos os requisitos foram atendidos
    const isAllRequirementsMet = Object.values(checkboxStatus).every(status => status);

    return (
        <form action="" className='form-req-edital'>
            {requisitos && requisitos.map((requisito) => {
                return (
                    <div key={requisito} className={ checkboxStatus[requisito] ? 'checked' : '' }>
                        <input 
                            type="checkbox" 
                            id={requisito}
                            onChange={handleCheckboxChange} 
                            checked={checkboxStatus[requisito]}
                        />
                        <label htmlFor={requisito}>{requisito}</label>
                    </div>
                )
            })}

            <input 
                type="button" 
                value="Validar requisitos" 
                className={`btn-validar-req ${!isAllRequirementsMet ? 'disabled' : ''}`}
                onClick={handleValidateButtonClick}
                disabled={!isAllRequirementsMet}
            />

            {isConfirmationOpen && (
                <div className="confirmation-modal">
                    <p>Deseja realmente validar os requisitos?</p>
                    <button onClick={(event) => handleConfirmationOK(event)}>Sim</button>
                    <button style={{background: '#FF3838'}} onClick={handleConfirmationCancel}>Cancelar</button>
                </div>
            )}
        </form>
    );
};
