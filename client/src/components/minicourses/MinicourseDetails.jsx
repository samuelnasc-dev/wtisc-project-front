import React from 'react';
import './MinicourseDetails.scss';
import EnrollmentCard from '../enrollmentCard/EnrollmentCard';

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
          availableSpots={capacity - enrolled}
          eventId={minicourseId}
          eventType="minicourse"
        />
      </div>
    </div>
  );
};

export default MinicourseDetails;
