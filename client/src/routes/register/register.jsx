import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import "./register.scss";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    setIsLoading(true);
    const formData = new FormData(e.target);

    const name = formData.get("name");
    const surname = formData.get("surname");
    const cpf = formData.get("cpf");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        name,
        surname,
        cpf,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="registerPage">
      <div className="imgContainer">
        <img src="/logo-wtisc-2.png" alt="" />
      </div>
      <div className="imgTravessao">
        <img src="/travessao.png" alt="" />
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Cadastre-se</h1>
          <div className="inputNomeSobrenome">
            <input name="name" type="text" placeholder="Nome" />
            <input name="surname" type="text" placeholder="Sobrenome" />
          </div>
          <input className="inputDemaisDados" name="cpf" type="text" placeholder="CPF" />
          <input className="inputDemaisDados" name="email" type="text" placeholder="Email" />
          <input className="inputDemaisDados" name="password" type="password" placeholder="Senha" />
          <button disabled={isLoading}>Cadastrar</button>
          {error && <span>{error}</span>}
          <div>
            <Link to="/login">Já tem cadastro?</Link>
          </div>
        </form>
      </div>
      
    </div>
  );
}

export default Register;
