import React, { useState } from "react";
import "./ConfigStyle.scss";

const Configurations = () => {
  const [userName, setUserName] = useState({ name: "", surname: "" });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });

  const handleNameChange = (e) => {
    setUserName({ ...userName, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    // Lógica para alterar o nome
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Lógica para alterar a senha
  };

  const handleAccountDeletion = () => {
    // Lógica para excluir a conta
  };

  return (
    <div className="config-page">
      <div className="container">
        <div className="content">
          <h1>Configurações</h1>

          <form onSubmit={handleNameSubmit} className="form-section">
            <label>Alterar nome de usuário</label>
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Nome"
                value={userName.name}
                onChange={handleNameChange}
              />
              <input
                type="text"
                name="surname"
                placeholder="Sobrenome"
                value={userName.surname}
                onChange={handleNameChange}
              />
            </div>
            <button type="submit" className="btn-primary">Alterar Nome</button>
          </form>

          <form onSubmit={handlePasswordSubmit} className="form-section">
            <label>Alterar senha</label>
            <div className="input-group">
              <input
                type="password"
                name="currentPassword"
                placeholder="Senha atual"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
              />
              <input
                type="password"
                name="newPassword"
                placeholder="Nova senha"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit" className="btn-primary">Alterar Senha</button>
          </form>

          <div className="account-deletion">
            <label>Exclusão de Conta</label>
            <p>
              A exclusão da conta é permanente. Ao excluir sua conta, você não
              poderá recuperar o conteúdo nem as informações que obteve dentro
              do nosso sistema (Ex: Certificados).
            </p>
            <button onClick={handleAccountDeletion} className="btn-danger">
              Excluir Conta
            </button>
          </div>
        </div>
        <div>
            <img src="/travessao.png" alt="" />
        </div>
        <div className="menu">
          <ul>
            <li><a href="/configuracoes" className="active">Configurações</a></li>
            <li><a href="/inscricoes">Inscrições</a></li>
            <li><a href="/certificates">Certificados</a></li>
            <li><a href="/logout" className="logout">Sair</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Configurations;
