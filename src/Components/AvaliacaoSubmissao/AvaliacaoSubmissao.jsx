import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

export function AvaliacaoSubmissao() {
  const { idSubmissao } = useParams()
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');
  const [isEvaluated, setIsEvaluated] = useState(false);

    const fetchStatus = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/submissoes/${idSubmissao}`)
            setStatus(response.data.status)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchStatus()

        if (status === "aprovada" || status === "reprovada") {
          setIsEvaluated(true); // Avaliação já foi feita (aprovada ou reprovada)
        } else {
          setIsEvaluated(false); // Ainda não foi avaliada
        }
    }, [status])

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.patch(
        `http://localhost:3001/submissoes/approve/${idSubmissao}`,
        { feedback }
      );
      toast.success(response.data.msg);
      setIsEvaluated(true)
      setStatus("aprovada")
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg || "Erro ao aprovar submissão.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (feedback === "") {
      toast.error("Para reprovar, é necessário fornecer um feedback.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.patch(
        `http://localhost:3001/submissoes/disapprove/${idSubmissao}`,
        { feedback }
      );
      toast.success(response.data.msg);
      setIsEvaluated(true); // Avaliação concluída
      setStatus("reprovada");
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg || "Erro ao reprovar submissão.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReavaliar = async () => {
    try {
        const response = await axios.patch(
          `http://localhost:3001/submissoes/reevaluate/${idSubmissao}`
        );
        toast.success(response.data.msg);
        setIsEvaluated(false); // Permite nova avaliação
        setStatus("")
      } catch (error) {
        const errorMessage =
          error.response?.data?.msg || "Erro ao reavaliar a submissão.";
        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
  }

  return (
    <div className="avaliacao-submissao">
      <h3>Avaliar Submissão</h3>
      {!isEvaluated && (
        <>
            <textarea
                placeholder="Digite seu feedback (obrigatório para reprovação)"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="4"
                cols="50"
            />

            <div>
                <button
                onClick={handleApprove}
                disabled={isSubmitting}
                className="approve-button"
                >
                Aprovar
                </button>
                <button
                onClick={handleReject}
                disabled={isSubmitting}
                className="reject-button"
                >
                Reprovar
                </button>
            </div>
        </>
      )}

      {isEvaluated && (
        <>
            <p>A submissão foi {status === "aprovada" ? "aprovada" : "reprovada"}. Caso deseje realizar uma reavaliação, clique no botão abaixo.</p>
            <button onClick={handleReavaliar} disabled={isSubmitting}>Reavaliar submissão</button>
        </>
      )}
    </div>
  );
};

