import React from 'react';
import './LectureDetails.scss'; // Estilos da página

const LectureDetails = ({ title, description, speaker, date, location, enrolled, capacity, handleEnroll }) => {
  return (
    <div className="lecture-details-container">

      <div className="lecture-content">
        <div>
            <div className="lecture-header">
            <h1>{title}</h1>
            <p className="lecture-info">
              <span>{date}</span> <span>|</span> <span>{location}</span>
            </p>
          </div>
          <div className="lecture-body">
          <h3>Descrição do evento</h3>
          <p className="lecture-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.</p>

            <div className="lecture-speaker-card">
              <h3>Palestrante</h3>
              <div className="speaker-info">
                <img src="/p2.png" alt={speaker.name} className="speaker-photo" />
                <div className="speaker-details">
                  <h4>Nome Palestrante</h4>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.</p>
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
            <button onClick={handleEnroll} disabled={enrolled >= capacity} className="enroll-button">
              Inscrever-se
            </button>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default LectureDetails;
