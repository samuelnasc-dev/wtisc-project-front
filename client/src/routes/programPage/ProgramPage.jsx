import React from "react";
import "./Programstyle.scss";
import programImage from "/programacao.png"; // Substitua o caminho pela localização correta da imagem

const ProgramPage = () => {
  return (
    <div className="program">
      <h1>Programação</h1>
      <p>Saiba quais os dias e horários dos melhores eventos disponíveis em nosso Workshop!</p>
      <div className="program-image-container">
        <img src={programImage} alt="Programação dos eventos" />
      </div>
    </div>
  );
};

export default ProgramPage;
