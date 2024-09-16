import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EnrollmentCardStyle.scss';
import ToastNotification from '../toastrNotification/ToastrNotification';

// Modal de confirmação
const ConfirmationModal = ({ show, onConfirm, onCancel, eventType }) => {
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
        <p>Tem certeza de que deseja se inscrever neste {eventType === 'lecture' ? 'palestra' : 'minicurso'}?</p>
        <button onClick={onConfirm}>Confirmar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

const EnrollmentCard = ({ title, availableSpots, eventId, eventType }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserEnrolled, setIsUserEnrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentSpots, setCurrentSpots] = useState(availableSpots);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate(); // Hook de navegação

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setIsLoggedIn(true);
        checkEnrollment(user.id); // Verifica a inscrição se estiver logado
      } else {
        setIsLoggedIn(false);
      }
    };

    const checkEnrollment = async (userId) => {
      try {
        const response = await fetch('http://localhost:8800/users/subscriptions/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userId}` // Adiciona o ID do usuário ao header para a API
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          const subscriptions =
            eventType === 'lecture' ? data.userLectureEnrollment : data.userMinicourseEnrollment;
          const enrolled = subscriptions.some(subscription => subscription[eventType === 'lecture' ? 'lectureId' : 'minicourseId'] === eventId);

          setIsUserEnrolled(enrolled);
        } else {
          console.error('Erro na resposta da API:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao verificar inscrição:', error);
      }
    };

    checkAuth();
  }, [eventId, eventType]);

  const handleEnrollClick = () => {
    if (isLoggedIn) {
      setShowModal(true);
    } else {
      setToast({ show: true, message: "Redirecionando para a página de login ", type: "info" });
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Espera 2 segundos antes de redirecionar
    }
  };

  const confirmEnrollment = async () => {
    setShowModal(false);

    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        const response = await axios.post(
          `http://localhost:8800/subscriptions/${eventType === 'lecture' ? 'lectures' : 'minicourses'}/`,
          { [eventType === 'lecture' ? 'lectureId' : 'minicourseId']: eventId },
          { withCredentials: true, headers: { 'Authorization': `Bearer ${user.id}` } } // Adiciona o ID do usuário ao header
        );

        if (response.status === 201) {
          setIsUserEnrolled(true);
          setCurrentSpots(prevSpots => prevSpots - 1); // Atualiza o número de vagas disponíveis
          setToast({ show: true, message: "Inscrição realizada com sucesso!", type: "success" });
        } else {
          setToast({ show: true, message: "Falha na inscrição.", type: "error" });
        }
      }
    } catch (error) {
      setToast({ show: true, message: "Falha na inscrição.", type: "error" });
      console.error('Erro ao realizar inscrição:', error);
    }
  };

  const cancelEnrollment = () => {
    setShowModal(false);
  };

  return (
    <div className="enrollment-card">
      <h2>Inscrição</h2>
      <div className="enrollment-details">
        <p>Ingresso – {title}</p>
        <p><strong>Vagas disponíveis:</strong> {currentSpots}</p>
        <p><strong>Inscrições até:</strong> 17/10/2023</p>
        <button
          onClick={handleEnrollClick}
          disabled={currentSpots <= 0 || isUserEnrolled}
          className={isUserEnrolled ? 'enrolled' : 'enroll-button'}
        >
          {isLoggedIn ? (isUserEnrolled ? 'Inscrito' : 'Inscreva-se') : 'Faça login para se inscrever'}
        </button>
      </div>

      <ConfirmationModal
        show={showModal}
        onConfirm={confirmEnrollment}
        onCancel={cancelEnrollment}
        eventType={eventType}
      />

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

export default EnrollmentCard;
