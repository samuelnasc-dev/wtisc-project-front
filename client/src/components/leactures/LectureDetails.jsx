import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './LectureDetails.scss';
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

const LectureDetails = ({ title, description, speaker, date, lectureLocation, enrolled, capacity, lectureId }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false); // Estado para verificar se o usuário está inscrito
  const [showModal, setShowModal] = useState(false);
  const [availableSpots, setAvailableSpots] = useState(capacity - enrolled);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Verificar se o usuário está logado e se está inscrito
    const checkAuth = async () => {
      try {
        await axios.get('/api/auth/check', { withCredentials: true }); // Verifica a autenticação do usuário
        setIsLoggedIn(true);

        // Verifica se o usuário já está inscrito
        const response = await axios.get(`/api/subscriptions/lectures/${lectureId}`, { withCredentials: true });
        setIsEnrolled(response.data.isEnrolled);
      } catch (error) {
        setIsLoggedIn(false);
        setIsEnrolled(false);
      }
    };

    checkAuth();
  }, [lectureId]);

  const handleEnroll = () => {
    if (!isLoggedIn) {
      // Redireciona para a página de login se o usuário não estiver logado
      navigate('/login', { state: { from: location.pathname } });
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
      if (!lectureId) {
        throw new Error('ID da palestra não definido.');
      }

      const response = await axios.post(
        'http://localhost:8800/subscriptions/lectures/',
        { lectureId },
        { withCredentials: true }
      );

      if (response.status === 201) {
        // Atualiza o número de vagas disponíveis
        setAvailableSpots(prev => prev - 1);
        setIsEnrolled(true); // Marca o usuário como inscrito
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
    <div className="lecture-details-container">
      <div className="lecture-content">
        <div>
          <div className="lecture-header">
            <h1>{title}</h1>
            <p className="lecture-info">
              <span>{date}</span> <span>|</span> <span>{lectureLocation}</span>
            </p>
          </div>
          <div className="lecture-body">
            <h3>Descrição da palestra</h3>
            <p className="lecture-description">{description}</p>

            <div className="lecture-speaker-card">
              <h3>Palestrante</h3>
              <div className="speaker-info">
                <img src="/p2.png" alt={speaker} className="speaker-photo" />
                <div className="speaker-details">
                  <h4>{speaker}</h4>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <img src="/travessao.png" alt="" />
        </div>

        <div className="lecture-info-card">
          <h2>Inscrição</h2>
          <div className="enrollment-details">
            <p>Ingresso para palestra – {title}</p>
            <p><strong>Vagas disponíveis:</strong> {availableSpots}</p>
            <p><strong>Inscrições até:</strong> 17/10/2023</p>
            <button
              onClick={handleEnroll}
              disabled={availableSpots <= 0 || isEnrolled} // Desabilita o botão se já estiver inscrito
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

export default LectureDetails;
