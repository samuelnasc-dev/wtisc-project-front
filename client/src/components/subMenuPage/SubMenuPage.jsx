import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./SubMenuPageStyle.scss";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

const SubMenuPage = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="menu">
      <ul>
        <li>
          <NavLink 
            to="/configurations" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Configurações
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/inscricoes" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Inscrições
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/certificates" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Certificados
          </NavLink>
        </li>
        <li>
          <button className="logout" onClick={handleLogout}>Sair</button>
        </li>
      </ul>
    </div>
  );
};

export default SubMenuPage;
