import React, { useState, useEffect } from 'react';
import "./eventsPage.scss";

function EventsPage() {
  const [activeTab, setActiveTab] = useState("palestras");
  const [data, setData] = useState([]);

  useEffect(() => {
    // Função para buscar os dados das palestras ou minicursos com base na aba ativa
    const fetchData = async () => {
      try {
        const endpoint = activeTab === "palestras" 
          ? 'http://localhost:8800/lectures'
          : 'http://localhost:8800/minicourses';

        const response = await fetch(endpoint);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(`Erro ao buscar ${activeTab}:`, error.message);
      }
    };

    fetchData();
  }, [activeTab]); // Atualiza a busca quando a aba ativa mudar

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
          data.map((event) => (
            <div key={event.id} className="event-card">
              <h2>{event.title}</h2>
              <p>Por: {event.speaker || event.instructor}</p>
              <p>{event.description}</p>
              <p>{event.location}</p>
              <button>Ver Mais</button>
              <button>Inscreva-se</button>
            </div>
          ))
        ) : (
          <p>Nenhum evento encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default EventsPage;
