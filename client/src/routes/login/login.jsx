import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import "./login.scss";
import Cookies from 'js-cookie';

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
      const res = await apiRequest.post("/auth/login", { cpf, password });
  
      console.log('Resposta da API:', res.data);
  
      const { token, ...userData } = res.data;
  
      // Armazenar o token em cookies
      Cookies.set('token', token, { expires: 7 });
  
      console.log('Token armazenado:', Cookies.get('token'));
  
      // Atualizar o contexto com todos os dados do usuário
      updateUser(userData);
  
      navigate("/");
    } catch (err) {
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