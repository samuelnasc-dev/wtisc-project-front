import React from 'react';
import './LectureDetails.scss'; // Estilos da página

const LectureDetails = ({ title, description, speaker, date, location, enrolled, capacity, handleEnroll }) => {
  return (
    <div className="lecture-details-container">
      <div className="lecture-header">
        <h1>{title}</h1>
        <p>{date} - {location}</p>
      </div>

      <div className="lecture-body">
        <p className="lecture-description">{description}</p>

        <div className="lecture-speaker">
          <h3>Palestrante</h3>
          <p>{speaker}</p>
        </div>

        <div className="lecture-enrollment">
          <p>{`Vagas disponíveis: ${capacity - enrolled}`}</p>
          <button onClick={handleEnroll} disabled={enrolled >= capacity}>
            Inscrever-se
          </button>
        </div>
      </div>
    </div>
  );
};

export default LectureDetails;
