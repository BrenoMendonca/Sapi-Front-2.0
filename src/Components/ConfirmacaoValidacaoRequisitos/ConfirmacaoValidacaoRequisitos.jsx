import axios from "axios";
import { toast } from "sonner";
import './ConfirmacaoValidacaoRequisitos.css';
import { useParams } from "react-router-dom";

export const ConfirmacaoValidacaoRequisitos = ({ setIsConfirmationOpen }) => {
    const { idSubmissao } = useParams()
    
    const handleValidate = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.patch(`http://localhost:3001/submissoes/validate/${idSubmissao}`);
            if (response.status === 200) {
                toast.success(response.data.msg);
            }
            if (response.status === 202) {toast.info(response.data.msg);}
            setIsConfirmationOpen(false)
            window.location.reload()

        } catch (error) {
            console.error('Erro ao validar requisitos:', error);
            if (error.response && error.response.data && error.response.data.msg) {
                toast.error(error.response.data.msg);
            } else {
                toast.error('Erro ao validar requisitos.');
            }      
        }
    };

    const handleInvalidate = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.patch(`http://localhost:3001/submissoes/invalidate/${idSubmissao}`);
            if (response.status === 200) {toast.warning(response.data.msg);}
            if (response.status === 202) {toast.info(response.data.msg);}
             // Limpa o localStorage após a invalidação dos requisitos
            localStorage.removeItem(`checkboxStatus_${idSubmissao}`);
            setIsConfirmationOpen(false)
            window.location.reload()


        } catch (error) {
            console.error('Erro ao invalidar requisitos:', error);
            if (error.response && error.response.data && error.response.data.msg) {
                toast.error(error.response.data.msg);
            } else {
                toast.error('Erro ao validar requisitos.');
            }      
        }
    };

    const handleConfirmationCancel = () => {
        setIsConfirmationOpen(false);
    };
    return (
        <div className="confirmation-modal">
            <p>Deseja realmente validar os requisitos?</p>
               <button id="positive" className="btn-confirm-req" onClick={(event) => handleValidate(event)}>Sim</button>
               <button id="negative" className="btn-confirm-req" onClick={(event) => handleInvalidate(event)}>Invalidar requisitos</button>
            <button id="back" className="btn-confirm-req" onClick={handleConfirmationCancel}>Cancelar</button>
        </div>
    )
}