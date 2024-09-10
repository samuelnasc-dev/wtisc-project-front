import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import "./login.scss";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const cpf = formData.get("cpf");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        cpf,
        password,
      });

      // Verifique a resposta da API
      console.log('Resposta da API:', res.data);

      // Supondo que o token esteja em res.data.token
      const { token, ...userData } = res.data;

      // Armazenar o token no localStorage
      localStorage.setItem("token", token);

      // Adicione este log para verificar se o token foi armazenado
      console.log('Token armazenado:', localStorage.getItem('token'));

      // Atualizar o contexto de autenticação
      updateUser(userData);

      navigate("/");
    } catch (err) {
      // Adicione este log para verificar o erro
      console.error('Erro no login:', err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
       <div className="imgContainer">
        <img src="/logo-wtisc-2.png" alt="" />
      </div>
      <div className="imgTravessao">
        <img src="/travessao.png" alt="" />
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <input
            name="cpf"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="CPF"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Senha"
          />
          <button disabled={isLoading}>Acessar conta</button>
          {error && <span>{error}</span>}
          <Link to="/register">Não tem cadastro?</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
