import React, { useState, useEffect } from 'react';
import "./eventsPage.scss";

function EventsPage() {
  const [activeTab, setActiveTab] = useState("palestras");
  const [data, setData] = useState([]);

  useEffect(() => {
    // Função para buscar os dados das palestras
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8800/lectures');
        // if (!response.ok) {
        //   const errorText = await response.text();
        //   throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. Response: ${errorText}`);
        // }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Erro ao buscar palestras:', error.message);
      }
    };

    fetchData();
  }, []);

  // Filtra os dados com base na aba ativa
  const filteredData = data.filter(event => event.category === activeTab);

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
        {filteredData.length > 0 ? (
          filteredData.map((event) => (
            <div key={event.id} className="event-card">
              <h2>{event.title}</h2>
              <p>Por: {event.speaker}</p>
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
