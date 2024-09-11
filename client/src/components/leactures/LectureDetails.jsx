import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './LectureDetails.scss';

const LectureDetails = ({ title, description, speaker, date, lectureLocation, enrolled, capacity, lectureId }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Função para verificar se o usuário está logado
    const checkAuth = async () => {
      try {
        await axios.get('/api/auth/check', { withCredentials: true }); // Verifica a autenticação
        setIsLoggedIn(true); // Usuário está logado
      } catch (error) {
        setIsLoggedIn(false); // Usuário não está logado
      }
    };

    checkAuth();
  }, []);

  const handleEnroll = async () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

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
        alert('Inscrição realizada com sucesso!');
      } else {
        throw new Error('Falha na inscrição.');
      }
    } catch (error) {
      console.error('Erro ao realizar inscrição:', error);
      alert('Erro ao realizar inscrição. Tente novamente mais tarde.');
    }
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
            <h3>Descrição do evento</h3>
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
            <p><strong>Vagas disponíveis:</strong> {capacity - enrolled}</p>
            <p><strong>Inscrições até:</strong> 17/10/2023</p>
            <button
              onClick={handleEnroll}
              disabled={enrolled >= capacity}
              className="enroll-button"
            >
              {isLoggedIn ? 'Inscrever-se' : 'Faça login para se inscrever'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureDetails;
