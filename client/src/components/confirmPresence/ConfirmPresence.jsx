import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./ConfirmPresenceStyle.scss";

const ConfirmPresence = () => {
  const { minicourseId } = useParams();  // Obtém o ID do minicurso a partir da URL
  const navigate = useNavigate();  // Hook para navegação
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const eventId = minicourseId;

      // Primeiro, envia a requisição PUT para confirmar a presença
      const presenceResponse = await axios.put(`http://localhost:8800/minicourses/auth/${eventId}`, {
        eventType: "MINICOURSE",
      }, {
        withCredentials: true // Garante que os cookies são enviados na requisição
      });

      if (presenceResponse.status === 200) {
        // Se o PUT foi bem-sucedido, envia o POST para gerar o certificado
        const certificateResponse = await axios.post('http://localhost:8800/certificates/', {
          eventId: eventId,
          eventType: "MINICOURSE",
        }, {
          withCredentials: true // Envia os cookies junto com a requisição
        });

        if (certificateResponse.status === 201) {
          alert("Presença confirmada! Certificado gerado com sucesso.");
          // Redireciona para a página de certificados
          navigate('/certificates');
        } else {
          throw new Error('Falha ao gerar o certificado.');
        }
      } else {
        throw new Error('Falha ao confirmar presença.');
      }
    } catch (err) {
      console.error(err);  // Log detalhado para ajudar a identificar o problema
      setError(err.response?.data?.message || 'Erro ao confirmar presença ou gerar o certificado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="confirm-presence-page">
      <div className="confirmation-box">
        <h1>Confirmar Presença no Minicurso</h1>
        <p>Deseja confirmar sua presença neste minicurso?</p>
        {loading ? (
          <p>Processando...</p>
        ) : (
          <button onClick={handleConfirm}>Sim, Confirmar Presença</button>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default ConfirmPresence;
