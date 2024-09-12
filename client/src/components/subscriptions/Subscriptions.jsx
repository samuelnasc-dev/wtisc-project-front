import axios from "axios";
import React, { useEffect, useState } from "react";
import "./InscricoesStyle.scss";
import ToastNotification from "../toastrNotification/ToastrNotification";

const Inscricoes = () => {
  const [activeTab, setActiveTab] = useState("palestras");
  const [inscricoesPalestras, setInscricoesPalestras] = useState([]);
  const [inscricoesMinicursos, setInscricoesMinicursos] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });


  useEffect(() => {
    const fetchInscricoes = async () => {
      try {
        const response = await axios.get("http://localhost:8800/users/subscriptions", {
          withCredentials: true, // Enviar cookies de autenticação
        });

        setInscricoesPalestras(response.data.userLectureEnrollment || []);
        setInscricoesMinicursos(response.data.userMinicourseEnrollment || []);
      } catch (error) {
        console.error("Erro ao buscar inscrições:", error);
      }
    };

    fetchInscricoes();
  }, []);

  const handleRemoveMinicurso = async (enrollmentId) => {
    try {
      await axios.delete(`http://localhost:8800/subscriptions/minicourses/${enrollmentId}`, {
        withCredentials: true, // Enviar cookies de autenticação
      });
      setToast({ show: true, message: "Inscrição excluída!", type: "success" });

      setInscricoesMinicursos((prevInscricoes) =>
        prevInscricoes.filter((inscricao) => inscricao.enrollmentId !== enrollmentId)
      );
    } catch (error) {
      console.error("Erro ao remover inscrição:", error);
    }
  };

  const handleRemovePalestra = async (enrollmentId) => {
    try {
      await axios.delete(`http://localhost:8800/subscriptions/lectures/${enrollmentId}`, {
        withCredentials: true, // Enviar cookies de autenticação
      });
      setToast({ show: true, message: "Inscrição excluída!", type: "success" });

      setInscricoesPalestras((prevInscricoes) =>
        prevInscricoes.filter((inscricao) => inscricao.enrollmentId !== enrollmentId)
      );
    } catch (error) {
      console.error("Erro ao remover inscrição:", error);
    }
  };

  // Função para abrir a caixa de confirmação
  const openConfirmation = (enrollmentId, type) => {
    setItemToRemove({ enrollmentId, type });
    setShowConfirmation(true);
  };

  // Função para confirmar a exclusão
  const confirmRemoval = async () => {
    if (itemToRemove) {
      const { enrollmentId, type } = itemToRemove;
      if (type === "minicourse") {
        await handleRemoveMinicurso(enrollmentId);
      } else if (type === "lecture") {
        await handleRemovePalestra(enrollmentId);
      }
      setShowConfirmation(false);
      setItemToRemove(null);
    }
  };

  // Função para cancelar a exclusão
  const cancelRemoval = () => {
    setShowConfirmation(false);
    setItemToRemove(null);
  };

  const renderInscricoes = (inscricoes, tipo) => {
    if (!inscricoes || inscricoes.length === 0) {
      return <p>Você ainda não está inscrito em nenhum {tipo}.</p>;
    }

    return inscricoes.map((inscricao) => (
      <div key={inscricao.enrollmentId} className="inscricao-card">
        <span>{inscricao[tipo]?.title || "Título não disponível"}</span>
        <button onClick={() => openConfirmation(inscricao.enrollmentId, tipo)}>
          <img src="/lixeira.png" alt="Remover" />
        </button>
      </div>
    ));
  };

  return (
    <div className="inscricoes-page">
      <div className="container">
        <div className="content">
          <h1>Inscrições</h1>
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
          <div className="inscricoes-list">
            {activeTab === "palestras"
              ? renderInscricoes(inscricoesPalestras, "lecture")
              : renderInscricoes(inscricoesMinicursos, "minicourse")}
          </div>
        </div>
        <div>
          <img src="/travessao.png" alt="" />
        </div>
        <div className="menu">
          <ul>
            <li><a href="/configurations">Configurações</a></li>
            <li><a href="/inscricoes" className="active">Inscrições</a></li>
            <li><a href="/certificates">Certificados</a></li>
            <li><a href="/logout" className="logout">Sair</a></li>
          </ul>
        </div>
      </div>

      {/* Caixa de confirmação */}
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>Tem certeza de que deseja remover sua inscrição?</p>
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

export default Inscricoes;
