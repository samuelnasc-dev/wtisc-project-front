import React from 'react';
import './MinicourseDetails.scss'; // Arquivo de estilos para minicursos

const MinicourseDetails = ({ title, description, instructor, date, enrolled, capacity, handleEnroll }) => {
  return (
    <div className="minicourse-details-container">
      <div className="minicourse-header">
        <h1>{title}</h1>
        <p>{date}</p>
      </div>

      <div className="minicourse-body">
        <p className="minicourse-description">{description}</p>

        <div className="minicourse-instructor">
          <h3>Instrutor</h3>
          <p>{instructor}</p>
        </div>

        <div className="minicourse-enrollment">
          <p>{`Vagas: ${enrolled}/${capacity}`}</p>
          <button onClick={handleEnroll} disabled={enrolled >= capacity}>
            Inscrever-se
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinicourseDetails;
