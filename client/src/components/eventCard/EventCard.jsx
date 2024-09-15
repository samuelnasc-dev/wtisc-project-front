import React from 'react';
import './EventCardStyle.scss'; // Certifique-se de criar um arquivo SCSS correspondente

const EventCard = ({ event, handleCardClick, handleViewMore, activeTab }) => {
  return (
    <div
      key={`${activeTab}-${event.lectureId || event.minicourseId}`}
      className="event-card"
      onClick={() => handleCardClick(event.lectureId || event.minicourseId, !!event.minicourseId)}
    >
      <h2>{event.title}</h2>
      <p>Por: {event.speaker || event.instructor}</p>
      <p>{event.description}</p>
      <p>{event.location}</p>
      <div className='buttonCard'>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Impede que o clique no botão propague para o card
            handleViewMore(event.lectureId || event.minicourseId, !!event.minicourseId);
          }}
        >
          Ver Mais
        </button>
      </div>
    </div>
  );
};

export default EventCard;
