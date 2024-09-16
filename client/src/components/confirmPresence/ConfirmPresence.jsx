import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ToastNotification from '../toastrNotification/ToastrNotification';
import "./ConfirmPresenceStyle.scss";

const ConfirmPresence = () => {
  const { type, eventId } = useParams();  // Obtém o tipo de evento e o ID a partir da URL
  const navigate = useNavigate();  // Hook para navegação
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      // Define a URL e o tipo de evento com base no tipo de evento
      const presenceUrl = type === "minicourse" 
        ? `http://localhost:8800/minicourses/auth/${eventId}` 
        : `http://localhost:8800/lectures/auth/${eventId}`;

      const eventType = type.toUpperCase();

      // Primeiro, envia a requisição PUT para confirmar a presença
      const presenceResponse = await axios.put(presenceUrl, {
        eventType: eventType,
      }, {
        withCredentials: true // Garante que os cookies são enviados na requisição
      });

      if (presenceResponse.status === 200) {
        // Se o PUT foi bem-sucedido, envia o POST para gerar o certificado
        const certificateResponse = await axios.post('http://localhost:8800/certificates/', {
          eventId: eventId,
          eventType: eventType,
        }, {
          withCredentials: true // Envia os cookies junto com a requisição
        });

        if (certificateResponse.status === 201) {
          setToast({ show: true, message: "Presença confirmada. Redirecionando para a página de certificados!", type: "success" });
          
          // Redireciona para a página de certificados após um curto delay
          setTimeout(() => {
            navigate('/certificates');
          }, 5000); // Ajuste o tempo conforme necessário
        } else {
          throw new Error('Falha ao gerar o certificado.');
        }
      } else {
        throw new Error('Falha ao confirmar presença.');
      }
    } catch (err) {
      console.error(err);  // Log detalhado para ajudar a identificar o problema
      setError(err.response?.data?.message || 'Erro ao confirmar presença ou gerar o certificado.');
      setToast({ show: true, message: "Erro ao confirmar presença ou gerar o certificado.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="confirm-presence-page">
      <div className="confirmation-box">
        <h1>CONFIRMAR PRESENÇA</h1>
        <p>Você precisa confirmar a sua presença para gerar o seu certificado.</p>
        {loading ? (
          <p>Processando...</p>
        ) : (
          <button onClick={handleConfirm}>Confirmar</button>
        )}
        {error && <p className="error">{error}</p>}
      </div>

      {/* Notificação de Toast */}
      {toast.show && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: "", type: "" })}
        />
      )}

    </div>
  );
};

export default ConfirmPresence;
