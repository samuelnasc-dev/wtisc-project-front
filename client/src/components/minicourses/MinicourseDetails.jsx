import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MinicourseDetails.scss';
import EnrollmentCard from '../enrollmentCard/EnrollmentCard';
import ToastNotification from '../toastrNotification/ToastrNotification';

// Modal de confirmação
const ConfirmationModal = ({ show, onConfirm, onCancel }) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
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
        <p>Tem certeza de que deseja se inscrever neste minicurso?</p>
        <button onClick={onConfirm}>Confirmar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

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

const MinicourseDetails = ({ title, description, instructor, date, minicourseLocation, enrolled, capacity, minicourseId }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [availableSpots, setAvailableSpots] = useState(capacity - enrolled);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/api/auth/check');
        setIsLoggedIn(true);
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
      if (!minicourseId) {
        throw new Error('ID do minicurso não definido.');
      }

      const response = await axios.post(`http://localhost:8800/subscriptions/minicourses/`, { minicourseId }, { withCredentials: true });

      if (response.status === 201) {
        setAvailableSpots(prev => prev - 1);
        setIsEnrolled(true);
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
    <div className="minicourse-details-container">
      <div className="minicourse-content">
        <div>
          <div className="minicourse-header">
            <h1>{title}</h1>
            <p className="minicourse-info">
              <span>{formattedDate}</span> <span>|</span> <span>{minicourseLocation}</span>
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
