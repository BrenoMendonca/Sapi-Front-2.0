import axios from "axios";
import { toast } from "sonner";
import './ConfirmacaoValidacaoRequisitos.css';
import { useParams } from "react-router-dom";

export const ConfirmacaoValidacaoRequisitos = ({ setIsConfirmationOpen }) => {
    const { id } = useParams()

    const handleConfirmationOK = async (event) => {
        event.preventDefault()

        try {
            await axios.patch(`http://localhost:3001/getEdital/validate-requisitos/${id}`)
                .then((response) => {
                    toast.success(response.data.msg)
                });

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
    return (
        <div className="confirmation-modal">
            <p>Deseja realmente validar os requisitos?</p>
            <button onClick={(event) => handleConfirmationOK(event)}>Sim</button>
            <button style={{background: '#FF3838'}} onClick={handleConfirmationCancel}>Cancelar</button>
        </div>
    )
}