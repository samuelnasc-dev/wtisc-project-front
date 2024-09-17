import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventCard from '../../../components/eventCard/EventCard'; // Atualize o caminho conforme necessário
import './eventsPage.scss';

function EventsPage() {
  const { type } = useParams(); // Captura o parâmetro de rota
  const [activeTab, setActiveTab] = useState(type === "minicourses" ? "minicursos" : "palestras"); // Define o tab ativo com base no tipo de evento
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Hook de navegação

  useEffect(() => {
    // Função para buscar os dados das palestras ou minicursos com base na aba ativa
    const fetchData = async () => {
      try {
        const endpoint = activeTab === "palestras"
          ? 'http://https://wtisc1.up.railway.app/lectures'
          : 'http://https://wtisc1.up.railway.app/minicourses';

        const response = await fetch(endpoint);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(`Erro ao buscar ${activeTab}:`, error.message);
      }
    };

    fetchData();
  }, [activeTab]); // Atualiza a busca quando a aba ativa mudar

  useEffect(() => {
    // Atualiza o tab ativo ao mudar o parâmetro da rota
    setActiveTab(type === "minicourses" ? "minicursos" : "palestras");
  }, [type]);

  const handleViewMore = (eventId, isMinicourse) => {
    if (isMinicourse && eventId) {
      navigate(`/minicoursePage/${eventId}`);
    } else if (eventId) {
      navigate(`/lecturePage/${eventId}`);
    } else {
      console.error("ID do evento não encontrado.");
    }
  };

  const handleCardClick = (eventId, isMinicourse) => {
    handleViewMore(eventId, isMinicourse);
  };

  return (
    <div className="eventos-container">
      <h1>Eventos</h1>
      <p>Conheça as palestras e minicursos que vão impulsionar seu conhecimento!</p>

      <div className="tabs">
        <button
          className={activeTab === "palestras" ? "active" : ""}
          onClick={() => setActiveTab("palestras")}
        >
          Palestras
        </button>
        <button
          className={activeTab === "minicursos" ? "active" : ""}
          onClick={() => setActiveTab("minicursos")}
        >
          Minicursos
        </button>
      </div>

      <div className="carousel">
        {data.length > 0 ? (
          data.map((event, index) => (
            <EventCard
              key={`${activeTab}-${event.lectureId || event.minicourseId || index}`}
              event={event}
              handleCardClick={handleCardClick}
              handleViewMore={handleViewMore}
              activeTab={activeTab}
            />
          ))
        ) : (
          <p>Nenhum evento encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default EventsPage;
