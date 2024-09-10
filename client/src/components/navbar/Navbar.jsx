import { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";
import apiRequest from "../../lib/apiRequest"; // Certifique-se de que a importação de apiRequest está correta
import "./navbar.scss";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Referência para o dropdown
  const navigate = useNavigate(); // Adiciona o hook useNavigate

  const { currentUser, updateUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetch();
    }
  }, [currentUser, fetch]);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo-wtisc.png" alt="WTISC Logo" />
        </Link>
        <Link to="/">Programação</Link>
        <Link to="/eventsPage/lectures">Eventos</Link>
        <Link to="/">Loja</Link>
        <Link to="/">Sobre</Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user" onClick={toggleDropdown}>
            <img src="/user.png" alt="User" />
            <span>Olá, {currentUser.user.name}</span>
            {dropdownOpen && (
              <div className="dropdown" ref={dropdownRef}>
                <Link to="/configurations">Configurações</Link>
                <Link to="/inscricoes">Inscrições</Link>
                <Link to="/certificates">Certificados</Link>
                <button className="logout-button" onClick={handleLogout}>Sair</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">Entrar</Link>
            <Link to="/register" className="register">Cadastre-se</Link>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt="Menu"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/">Programação</Link>
          <Link to="/eventsPage/lecture">Eventos</Link>
          <Link to="/">Loja</Link>
          <Link to="/">Sobre</Link>
          <Link to="/login">Entrar</Link>
          <Link to="/register">Cadastre-se</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
