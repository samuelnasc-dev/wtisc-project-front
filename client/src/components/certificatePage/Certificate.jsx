import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CertificateStyle.scss";

// Função para buscar o título do evento com base no eventId
const fetchEventName = async (eventId, eventType) => {
  try {
    let url = '';

    if (eventType === 'MINICOURSE') {
      url = `http://localhost:8800/minicourses/${eventId}`;
    } else if (eventType === 'LECTURE') {
      url = `http://localhost:8800/lectures/${eventId}`;
    } else {
      throw new Error('Tipo de evento desconhecido');
    }

    const response = await axios.get(url, { withCredentials: true });
    return response.data.title || 'Título não disponível'; // Adiciona fallback para o título
  } catch (error) {
    console.error("Erro ao buscar informações do evento:", error);
    return 'Título não disponível';
  }
};

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [eventTitles, setEventTitles] = useState({});

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get('http://localhost:8800/users/certificates/', { withCredentials: true });
        const certificatesData = response.data || [];
        setCertificates(certificatesData);

        // Buscar títulos dos eventos
        const eventTitlesPromises = certificatesData.map(async (cert) => {
          const title = await fetchEventName(cert.eventId, cert.eventType);
          return { eventId: cert.eventId, title };
        });

        const eventTitlesArray = await Promise.all(eventTitlesPromises);
        const eventTitlesMap = eventTitlesArray.reduce((acc, { eventId, title }) => {
          acc[eventId] = title;
          return acc;
        }, {});

        setEventTitles(eventTitlesMap);
      } catch (error) {
        console.error("Erro ao buscar certificados:", error);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <div className="certificates-page">
      <div className="container">
        <div className="content">
          <h1>Certificados</h1>
          <div className="certificates-list">
            {certificates.length > 0 ? (
              certificates.map((cert) => (
                <div key={cert.certificateId} className="certificate-card">
                  <span>{eventTitles[cert.eventId] || 'Título não disponível'}</span>
                  <a href={`http://localhost:8800/certificates/issue/${cert.certificateId}`} target="_blank" rel="noopener noreferrer">
                    <img src="Vector.png" alt="Visualizar" />
                  </a>
                </div>
              ))
            ) : (
              <p>Não há certificados disponíveis.</p>
            )}
          </div>
        </div>
        <div>
          <img src="/travessao.png" alt="" />
        </div>
        <div className="menu">
          <ul>
            <li><a href="/configurations">Configurações</a></li>
            <li><a href="/inscricoes">Inscrições</a></li>
            <li><a href="/certificados" className="active">Certificados</a></li>
            <li><a href="/logout" className="logout">Sair</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
