import React, { useEffect } from "react";
import "./ToastNotificationStyle.scss"; // Importa o SCSS para estilização

const ToastNotification = ({ message, type, duration = 5000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Remove o toast após o tempo definido
    }, duration);

    return () => clearTimeout(timer); // Limpa o timer ao desmontar
  }, [duration, onClose]);

  return (
    <div className={`toast-notification ${type}`}>
      <button className="close-button" onClick={onClose}>
        ×
      </button>
      <div className="message">{message}</div>
      {/* Barra de progresso */}
      <div className="progress-bar">
        <div className="progress" style={{ animationDuration: `${duration}ms` }} />
      </div>
    </div>
  );
};

export default ToastNotification;
