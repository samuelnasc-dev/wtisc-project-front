import React from 'react';
import './MinicourseDetails.scss'; // Arquivo de estilos para minicursos

const MinicourseDetails = ({ title, description, instructor, date, enrolled, capacity, handleEnroll }) => {
  return (
    <div className="minicourse-details-container">

      <div className="minicourse-content">
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
            <button onClick={handleEnroll} disabled={enrolled >= capacity} className="enroll-button">
              Inscrever-se
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default MinicourseDetails;
