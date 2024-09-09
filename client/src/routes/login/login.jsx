import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import "./login.scss";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {updateUser} = useContext(AuthContext)

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

      updateUser(res.data)

      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
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
