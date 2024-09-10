import React, { useState, useEffect } from "react";
import axios from "axios";
import "./InscricoesStyle.scss";

const Inscricoes = () => {
  const [activeTab, setActiveTab] = useState("palestras");
  const [inscricoesPalestras, setInscricoesPalestras] = useState([]);
  const [inscricoesMinicursos, setInscricoesMinicursos] = useState([]);

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

  // Função para remover inscrição
  const handleRemoveMinicurso = async (enrollmentId) => {
    try {
      await axios.delete(`http://localhost:8800/subscriptions/minicourses/${enrollmentId}`, {
        withCredentials: true, // Enviar cookies de autenticação
      });

      // Atualiza a lista de minicursos após a exclusão
      setInscricoesMinicursos((prevInscricoes) =>
        prevInscricoes.filter((inscricao) => inscricao.enrollmentId !== enrollmentId)
      );
    } catch (error) {
      console.error("Erro ao remover inscrição:", error);
    }
  };

  const renderInscricoes = (inscricoes, tipo) => {
    if (!inscricoes || inscricoes.length === 0) {
      return <p>Você ainda não está inscrito em nenhum {tipo}.</p>;
    }

    return inscricoes.map((inscricao) => (
      <div key={inscricao.enrollmentId} className="inscricao-card">
        <span>{inscricao[tipo]?.title || "Título não disponível"}</span>
        {/* Botão para remover inscrição */}
        {tipo === "minicourse" && (
          <button onClick={() => handleRemoveMinicurso(inscricao.enrollmentId)}>
            <img src="/lixeira.png" alt="Remover" />
          </button>
        )}
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
              ? renderInscricoes(inscricoesPalestras, 'lecture')
              : renderInscricoes(inscricoesMinicursos, 'minicourse')}
          </div>
        </div>
        <div>
          <img src="/travessao.png" alt="" />
        </div>
        <div className="menu">
          <ul>
            <li>
              <a href="/configurations">Configurações</a>
            </li>
            <li>
              <a href="/inscricoes" className="active">
                Inscrições
              </a>
            </li>
            <li>
              <a href="/certificates">Certificados</a>
            </li>
            <li>
              <a href="/logout" className="logout">
                Sair
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Inscricoes;
