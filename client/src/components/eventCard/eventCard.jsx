// components/EventCard.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { enrollInLecture, enrollInMinicourse } from '../services/enrollmentService';
import { useAuth } from '../context/AuthContext'; // Contexto de autenticação

const EventCard = ({ event }) => {
    const { user } = useAuth(); // Obtém o usuário logado do contexto
    const [isEnrolled, setIsEnrolled] = React.useState(false);

    const handleEnroll = async () => {
        if (!user) {
            alert('Você precisa estar logado para se inscrever!');
            return;
        }

        try {
            const token = user.token; // Obtenha o token JWT do usuário logado
            if (event.type === 'lecture') {
                await enrollInLecture(event.id, token);
            } else if (event.type === 'minicourse') {
                await enrollInMinicourse(event.id, token);
            }
            setIsEnrolled(true);
            alert('Inscrição realizada com sucesso!');
        } catch (error) {
            alert('Erro ao realizar a inscrição. Tente novamente.');
        }
    };

    return (
        <div className="event-card">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <button onClick={handleEnroll} disabled={isEnrolled}>
                {isEnrolled ? 'Inscrito' : 'Inscreva-se'}
            </button>
        </div>
    );
};

EventCard.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['lecture', 'minicourse']).isRequired,
    }).isRequired,
};

export default EventCard;
