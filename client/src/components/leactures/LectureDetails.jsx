import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './LectureDetails.scss';
import EnrollmentCard from '../enrollmentCard/EnrollmentCard'; // Importe o EnrollmentCard
import ToastNotification from '../toastrNotification/ToastrNotification';

// Função de formatação de data
const formatDate = (dateString) => {
  const months = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `Dia ${day} ${month} de ${year} às ${hours}:${minutes}`;
};

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

  // Formatar a data
  const formattedDate = formatDate(date);

  return (
    <div className="lecture-details-container">
      <div className="lecture-content">
        <div>
          <div className="lecture-header">
            <h1>{title}</h1>
            <p className="lecture-info">
              <span>{formattedDate}</span> <span>|</span> <span>{lectureLocation}</span>
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

        <EnrollmentCard
          title={title}
          availableSpots={availableSpots}
          isEnrolled={isEnrolled}
          isLoggedIn={isLoggedIn}
          handleEnroll={handleEnroll}
        />
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
