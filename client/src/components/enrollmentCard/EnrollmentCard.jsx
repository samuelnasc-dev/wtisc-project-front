import React from 'react';
import './EnrollmentCardStyle.scss'; // Estilizações específicas para o card de inscrição

const EnrollmentCard = ({ title, availableSpots, isEnrolled, isLoggedIn, handleEnroll }) => {
  return (
    <div className="enrollment-card">
      <h2>Inscrição</h2>
      <div className="enrollment-details">
        <p>Ingresso – {title}</p>
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
  );
};

export default EnrollmentCard;
