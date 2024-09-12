import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MinicourseDetails.scss';
import ToastNotification from '../toastrNotification/ToastrNotification';

// Modal de confirmação
const ConfirmationModal = ({ show, onConfirm, onCancel }) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Evita o comportamento padrão da tecla Enter
        onConfirm();
      }
    };

    if (show) {
      window.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [show, onConfirm]);

  if (!show) return null;

  return (
    <div className="confirmation-modal">
      <div className="modal-content">
        <p>Tem certeza de que deseja se inscrever nesta palestra?</p>
        <button onClick={onConfirm}>Confirmar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

const MinicourseDetails = ({ title, description, instructor, date, enrolled, capacity, minicourseId }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false); // Estado para verificar se o usuário está inscrito
  const [showModal, setShowModal] = useState(false);
  const [availableSpots, setAvailableSpots] = useState(capacity - enrolled);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    // Verificar se o usuário está logado e se está inscrito
    const checkAuth = async () => {
      try {
        await axios.get('/api/auth/check'); // Verifica a autenticação do usuário
        setIsLoggedIn(true);

        // Verifica se o usuário já está inscrito
        const response = await axios.get(`/api/subscriptions/minicourses/${minicourseId}`, { withCredentials: true });
        setIsEnrolled(response.data.isEnrolled);
      } catch (error) {
        setIsLoggedIn(false);
        setIsEnrolled(false);
      }
    };

    checkAuth();
  }, [minicourseId]);

  const handleEnroll = () => {
    if (!isLoggedIn) {
        // Redirecionar para a página de login se o usuário não estiver logado
        window.location.href = '/login';
        return;
    }

    if (isEnrolled) {
      return;
    }

    setShowModal(true);
  };

  const confirmEnrollment = async () => {
    setShowModal(false);
    
    try {
        // Verifique se minicourseId está definido
        if (!minicourseId) {
            throw new Error('ID do minicurso não definido.');
        }

        // Enviar a requisição POST para o backend
        const response = await axios.post(`http://localhost:8800/subscriptions/minicourses/`, { minicourseId }, { withCredentials: true });

        // Verificar a resposta
        if (response.status === 201) { // Status 201 significa que o recurso foi criado com sucesso
            // Atualiza o número de vagas disponíveis
            setAvailableSpots(prev => prev - 1);
            setIsEnrolled(true); // Atualiza o estado para indicar que o usuário está inscrito
            setToast({ show: true, message: "Inscrição realizada!", type: "success" });
        } else {
            throw new Error('Falha na inscrição.');
        }
    } catch (error) {
      setToast({ show: true, message: "Inscrição não realizada!", type: "error" });
    }
  };

  const cancelEnrollment = () => {
    setShowModal(false);
  };

  return (
    <div className="minicourse-details-container">
      <div className="minicourse-content">
        {/* Conteúdo do minicurso */}
        <div>
          <div className="minicourse-header">
            <h1>{title}</h1>
            <p className="minicourse-info">
              <span>{date}</span> <span>|</span> <span>{`Vagas disponíveis: ${availableSpots}`}</span>
            </p>
          </div>
          <div className="minicourse-body">
            <h3>Descrição do minicurso</h3>
            <p className="minicourse-description">{description}</p>

            <div className="minicourse-instructor-card">
              <h3>Instrutor</h3>
              <div className="instructor-info">
                <img src="/p2.png" alt={instructor} className="instructor-photo" />
                <div className="instructor-details">
                  <h4>{instructor}</h4>
                  <p>Descrição do instrutor.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <img src="/travessao.png" alt="" />
        </div>

        <div className="minicourse-info-card">
          <h2>Inscrição</h2>
          <div className="enrollment-details">
            <p>Ingresso para minicurso – {title}</p>
            <p><strong>Inscrições até:</strong> 17/10/2023</p>
            <button
              onClick={handleEnroll}
              disabled={availableSpots <= 0 || !isLoggedIn || isEnrolled} // Desabilita o botão se o usuário estiver inscrito
              className={`enroll-button ${isEnrolled ? 'enrolled' : ''}`} // Adiciona classe condicional
            >
              {isEnrolled ? 'Inscrito' : isLoggedIn ? 'Inscrever-se' : 'Faça login para se inscrever'}
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        show={showModal}
        onConfirm={confirmEnrollment}
        onCancel={cancelEnrollment}
      />

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

export default MinicourseDetails;
