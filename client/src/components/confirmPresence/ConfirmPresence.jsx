import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./ConfirmPresenceStyle.scss";

const ConfirmPresence = () => {
  const { minicourseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // Verifica o token do usuário pelos cookies
      const eventId = minicourseId;

      // Envia a requisição para adicionar o certificado
      const certificateResponse = await axios.post('http://localhost:8800/certificates/', {
        eventId: eventId,
        eventType: "MINICOURSE",
      }, {
        withCredentials: true // Garante que os cookies são enviados na requisição
      });

      if (certificateResponse.status === 200) {
        alert("Presença confirmada! Certificado gerado com sucesso.");
        // Redireciona para a página de certificados
        navigate('/certificates');
      }
    } catch (err) {
      setError('Erro ao confirmar presença ou gerar o certificado.');
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
