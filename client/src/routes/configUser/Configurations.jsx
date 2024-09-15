import React, { useState } from "react";
import axios from "axios";
import "./ConfigStyle.scss";
import SubMenuPage from "../../components/subMenuPage/SubMenuPage";

const Configurations = () => {
  const [userName, setUserName] = useState({ name: "", surname: "" });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [message, setMessage] = useState(""); // Para exibir mensagens de sucesso ou erro

  // Pega o userId do localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.user?.id;

  const handleNameChange = (e) => {
    setUserName({ ...userName, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {};
      if (userName.name) payload.name = userName.name;
      if (userName.surname) payload.surname = userName.surname;

      if (Object.keys(payload).length === 0) {
        setMessage("Por favor, preencha pelo menos um campo.");
        return;
      }

      // Requisição PUT para atualizar o nome/sobrenome
      const response = await axios.put(
        `http://localhost:8800/users/${userId}`,
        payload,
        { withCredentials: true }
      );

      setMessage("Informações atualizadas com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar informações:", error);
      setMessage("Ocorreu um erro ao atualizar as informações.");
    }
  };

  const handleAccountDeletion = async () => {
    const confirmDeletion = window.confirm(
      "Tem certeza de que deseja excluir sua conta? Esta ação é permanente e não pode ser desfeita."
    );

    if (!confirmDeletion) return;

    try {
      // Verificar inscrições e certificados antes de excluir a conta
      const subscriptionsResponse = await axios.get(
        "http://localhost:8800/users/subscriptions",
        { withCredentials: true }
      );
      const certificatesResponse = await axios.get(
        "http://localhost:8800/users/certificates",
        { withCredentials: true }
      );

      // Verifica se o usuário possui inscrições ou certificados
      const hasSubscriptions =
        subscriptionsResponse.data.userLectureEnrollment.length > 0 ||
        subscriptionsResponse.data.userMinicourseEnrollment.length > 0;
      const hasCertificates = certificatesResponse.data.length > 0;

      if (hasSubscriptions || hasCertificates) {
        setMessage(
          "Você possui inscrições ou certificados. Por favor, exclua-os antes de deletar sua conta."
        );
        return;
      }

      // Se não houver inscrições ou certificados, procede com a exclusão da conta
      const response = await axios.delete(
        `http://localhost:8800/users/${userId}`,
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 204) {
        setMessage("Conta excluída com sucesso!");
        localStorage.removeItem("user");
        window.location.href = "/";
      } else {
        setMessage("Não foi possível excluir a conta. Tente novamente mais tarde.");
      }
    } catch (error) {
      console.error("Erro ao excluir a conta:", error.response?.data || error.message);
      setMessage("Ocorreu um erro ao excluir a conta. Tente novamente mais tarde.");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!passwords.newPassword) {
        setMessage("Por favor, preencha o campo da nova senha.");
        return;
      }

      if (passwords.newPassword.length < 6) {
        setMessage("A nova senha deve ter pelo menos 6 caracteres.");
        return;
      }

      const response = await axios.put(
        `http://localhost:8800/users/${userId}`,
        { password: passwords.newPassword },
        { withCredentials: true }
      );

      setMessage("Senha atualizada com sucesso!");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (error) {
      console.error("Erro ao atualizar a senha:", error);
      setMessage("Ocorreu um erro ao atualizar a senha.");
    }
  };

  return (
    <div className="config-page">
      <div className="container">
        <div className="content">
          <h1>Configurações</h1>

          {message && <p>{message}</p>} {/* Exibe mensagens de erro ou sucesso */}

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
        <SubMenuPage />
      </div>
    </div>
  );
};

export default Configurations;
