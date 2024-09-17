import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CertificateStyle.scss";
import { AuthContext } from "../../context/AuthContext";
import ToastNotification from "../../components/toastrNotification/ToastrNotification"; // Importando ToastNotification
import SubMenuPage from "../../components/subMenuPage/SubMenuPage";

// Função para buscar o título do evento com base no eventId
const fetchEventName = async (eventId, eventType) => {
  try {
    let url = '';

    if (eventType === 'MINICOURSE') {
      url = `http://https://wtisc1.up.railway.app/minicourses/${eventId}`;
    } else if (eventType === 'LECTURE') {
      url = `http://https://wtisc1.up.railway.app/lectures/${eventId}`;
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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get('http://https://wtisc1.up.railway.app/users/certificates/', { withCredentials: true });
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

  const handleRemoveCertificate = async (certificateId) => {
    try {
      await axios.delete(`http://https://wtisc1.up.railway.app/certificates/${certificateId}`, { withCredentials: true });
      setToast({ show: true, message: "Certificado excluído!", type: "success" });

      setCertificates((prevCertificates) =>
        prevCertificates.filter((cert) => cert.certificateId !== certificateId)
      );
    } catch (error) {
      console.error("Erro ao remover certificado:", error);
      setToast({ show: true, message: "Erro ao excluir certificado.", type: "error" });
    }
  };

  const openConfirmation = (certificateId) => {
    setItemToRemove(certificateId);
    setShowConfirmation(true);
  };

  const confirmRemoval = async () => {
    if (itemToRemove) {
      await handleRemoveCertificate(itemToRemove);
      setShowConfirmation(false);
      setItemToRemove(null);
    }
  };

  const cancelRemoval = () => {
    setShowConfirmation(false);
    setItemToRemove(null);
  };

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
                  <div className="buttons-certificate">
                    <a href={`http://https://wtisc1.up.railway.app/certificates/issue/${cert.certificateId}`} target="_blank" rel="noopener noreferrer">
                      <img src="Vector.png" alt="Visualizar" />
                    </a>
                    <button onClick={() => openConfirmation(cert.certificateId)}>
                      <img src="/lixeira.png" alt="Remover" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Não há certificados disponíveis.</p>
            )}
          </div>
        </div>
        <div className="travessaoImg">
          <img src="/travessao.png" alt="" />
        </div>
        <SubMenuPage />
      </div>

      {/* Caixa de confirmação */}
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>Tem certeza de que deseja remover este certificado?</p>
            <button onClick={confirmRemoval}>Confirmar</button>
            <button onClick={cancelRemoval}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Notificação de Toast */}
      {toast.show && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: "", type: "" })}
        />
      )}
    </div>
  );
};

export default Certificates;
