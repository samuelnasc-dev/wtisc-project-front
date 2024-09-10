import React from "react";
import "./CertificateStyle.scss";

const Certificates = () => {
  const certificates = [
    {
      id: 1,
      title: "Melhorando prompts no ChatGPT - Régis Pires",
      downloadLink: "/path/to/certificate1.pdf",
    },
    {
      id: 2,
      title: "Desenvolvimento Ágil e Scrum - Carlos Almeida",
      downloadLink: "/path/to/certificate2.pdf",
    },
  ];

  return (
    <div className="certificates-page">
      <div className="container">
        <div className="content">
          <h1>Certificados</h1>
          <div className="certificates-list">
            {certificates.map((cert) => (
              <div key={cert.id} className="certificate-card">
                <span>{cert.title}</span>
                <a href={cert.downloadLink} download>
                  <img src="Vector.png" alt="Download" />
                </a>
              </div>
            ))}
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
              <a href="/inscricoes">Inscrições</a>
            </li>
            <li>
              <a href="/certificados" className="active">
                Certificados
              </a>
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

export default Certificates;
