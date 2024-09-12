import React, { useState, useEffect } from 'react';
import './ToastNotificationStyle.scss'; // Importa o SCSS para estilização

const ToastNotification = ({ message, type, duration = 2000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Remove o toast após o tempo definido
    }, duration);

    return () => clearTimeout(timer); // Limpa o timer ao desmontar
  }, [duration, onClose]);

  return (
    <div className={`toast-notification ${type}`}>
      <button className="close-button" onClick={onClose}>×</button>
      <div className="message">{message}</div>
    </div>
  );
};

export default ToastNotification;
