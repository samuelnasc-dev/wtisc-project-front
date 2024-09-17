import React, { useState } from "react";
import axios from "axios";
import "./ConfigStyle.scss";
import SubMenuPage from "../../components/subMenuPage/SubMenuPage";
import ToastNotification from "../../components/toastrNotification/ToastrNotification";

const Configurations = () => {
  const [userName, setUserName] = useState({ name: "", surname: "" });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [toast, setToast] = useState({ show: false, message: "", type: "" }); // Estado para controlar o ToastNotification

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
        setToast({
          show: true,
          message: "Por favor, preencha pelo menos um campo.",
          type: "error", // Tipo de notificação para erros
        });
        return;
      }

      // Requisição PUT para atualizar o nome/sobrenome
      const response = await axios.put(
        `http://https://wtisc1.up.railway.app/users/${userId}`,
        payload,
        { withCredentials: true }
      );

      setToast({
        show: true,
        message: "Informações atualizadas com sucesso!",
        type: "success", // Notificação de sucesso
      });
    } catch (error) {
      console.error("Erro ao atualizar informações:", error);
      setToast({
        show: true,
        message: "Ocorreu um erro ao atualizar as informações.",
        type: "error",
      });
    }
  };

  const handleAccountDeletion = async () => {
    try {
      const subscriptionsResponse = await axios.get(
        "http://https://wtisc1.up.railway.app/users/subscriptions",
        { withCredentials: true }
      );
      const certificatesResponse = await axios.get(
        "http://https://wtisc1.up.railway.app/users/certificates",
        { withCredentials: true }
      );

      const hasSubscriptions =
        subscriptionsResponse.data.userLectureEnrollment.length > 0 ||
        subscriptionsResponse.data.userMinicourseEnrollment.length > 0;
      const hasCertificates = certificatesResponse.data.length > 0;

      if (hasSubscriptions || hasCertificates) {
        setToast({
          show: true,
          message:
            "Você possui inscrições ou certificados. Por favor, exclua-os antes de deletar sua conta.",
          type: "warning", // Notificação de aviso
        });
        return;
      }

      // Definir o tempo de exibição da notificação (por exemplo, 5 segundos)
      setTimeout(() => {
        setToast({
          show: false,
          message: "",
          type: "",
        });
      }, 5000);

      const response = await axios.delete(
        `http://https://wtisc1.up.railway.app/users/${userId}`,
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 204) {
        setToast({
          show: true,
          message: "Conta excluída com sucesso!",
          type: "success",
        });
        localStorage.removeItem("user");
        window.location.href = "/";
      } else {
        setToast({
          show: true,
          message: "Não foi possível excluir a conta. Tente novamente mais tarde.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Erro ao excluir a conta:", error.response?.data || error.message);
      setToast({
        show: true,
        message: "Ocorreu um erro ao excluir a conta. Tente novamente mais tarde.",
        type: "error",
      });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!passwords.newPassword) {
        setToast({
          show: true,
          message: "Por favor, preencha o campo da nova senha.",
          type: "error",
        });
        return;
      }

      if (passwords.newPassword.length < 6) {
        setToast({
          show: true,
          message: "A nova senha deve ter pelo menos 6 caracteres.",
          type: "error",
        });
        return;
      }

      const response = await axios.put(
        `http://https://wtisc1.up.railway.app/users/${userId}`,
        { password: passwords.newPassword },
        { withCredentials: true }
      );

      setToast({
        show: true,
        message: "Senha atualizada com sucesso!",
        type: "success",
      });
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (error) {
      console.error("Erro ao atualizar a senha:", error);
      setToast({
        show: true,
        message: "Ocorreu um erro ao atualizar a senha.",
        type: "error",
      });
    }
  };

  return (
    <div className="config-page">
      <div className="container">
        <div className="content">
          <h1>Configurações</h1>

          {/* Notificação de Toast */}
          {toast.show && (
            <ToastNotification
              message={toast.message}
              type={toast.type}
              onClose={() => setToast({ show: false, message: "", type: "" })}
            />
          )}

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
        <div className="travessaoImg">
          <img src="/travessao.png" alt="" />
        </div>
        <SubMenuPage />
      </div>
    </div>
  );
};

export default Configurations;
