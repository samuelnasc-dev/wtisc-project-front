import React, { useState } from "react";
import "./InscricoesStyle.scss";

const Inscricoes = () => {
  const [activeTab, setActiveTab] = useState("palestras");

  const inscricoesPalestras = [
    {
      id: 1,
      title: "Estudo das fontes de cálcio dos alimentos lácteos - Fulano de Tal",
    },
    {
      id: 2,
      title: "Estudo das fontes de cálcio dos alimentos lácteos - Fulano de Tal",
    },
  ];

  const inscricoesMinicursos = [
    {
      id: 1,
      title: "Introdução à Nutrição - Fulano de Tal",
    },
    {
      id: 2,
      title: "Avanços na Ciência dos Alimentos - Fulano de Tal",
    },
  ];

  const renderInscricoes = (inscricoes) => {
    return inscricoes.map((inscricao) => (
      <div key={inscricao.id} className="inscricao-card">
        <span>{inscricao.title}</span>
        <button>
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
              ? renderInscricoes(inscricoesPalestras)
              : renderInscricoes(inscricoesMinicursos)}
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
