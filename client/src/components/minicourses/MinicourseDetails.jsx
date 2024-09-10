import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MinicourseDetails.scss';

const MinicourseDetails = ({ title, description, instructor, date, enrolled, capacity, minicourseId }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log('Minicourse ID:', minicourseId);

  useEffect(() => {
    // Verificar se o usuário está logado
    const checkAuth = async () => {
      try {
        await axios.get('/api/auth/check'); // Verifica a autenticação do usuário
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const handleEnroll = async () => {
    if (!isLoggedIn) {
        // Redirecionar para a página de login se o usuário não estiver logado
        window.location.href = '/login';
        return;
    }

    try {
        // Verifique se minicourseId está definido
        if (!minicourseId) {
            throw new Error('ID do minicurso não definido.');
        }

        // Enviar a requisição POST para o backend
        const response = await axios.post(`http://localhost:8800/subscriptions/minicourses/`, { minicourseId });
        
        // Verificar a resposta
        if (response.status === 200) {
            alert('Inscrição realizada com sucesso!');
        } else {
            throw new Error('Falha na inscrição.');
        }
    } catch (error) {
        console.error('Erro ao realizar inscrição:', error); // Log do erro para depuração
    }
};


  return (
    <div className="minicourse-details-container">
      <div className="minicourse-content">
        {/* Conteúdo do minicurso */}
        <div>
          <div className="minicourse-header">
            <h1>{title}</h1>
            <p className="minicourse-info">
              <span>{date}</span> <span>|</span> <span>{`Vagas disponíveis: ${capacity - enrolled}`}</span>
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
            <button onClick={handleEnroll} disabled={enrolled >= capacity || !isLoggedIn} className="enroll-button">
              {isLoggedIn ? 'Inscrever-se' : 'Faça login para se inscrever'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinicourseDetails;
