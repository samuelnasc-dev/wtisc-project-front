import React from 'react';
import './LectureDetails.scss';
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

const LectureDetails = ({ title, description, speaker, date, lectureLocation, enrolled, capacity, lectureId }) => {
  return (
    <div className="lecture-details-container">
      <div className="lecture-content">
        <div className='lecture-data'>
          <div className="lecture-header">
            <h1>{title}</h1>
            <p className="lecture-info">
              <span>{formatDate(date)}</span> <span>|</span> <span>{lectureLocation}</span>
            </p>
          </div>
          <div className="lecture-body">
            <h3>Descrição da palestra</h3>
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

        <div className='travessaoImg'>
          <img src="/travessao.png" alt="" />
        </div>

        <EnrollmentCard
          title={title}
          availableSpots={capacity - enrolled}
          eventId={lectureId}
          eventType="lecture"
        />
      </div>
    </div>
  );
};

export default LectureDetails;
