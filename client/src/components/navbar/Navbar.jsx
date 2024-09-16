import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import "./navbar.scss";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null); // Limpa o estado do usuário
      localStorage.removeItem("user"); // Limpa o localStorage
      navigate("/"); // Redireciona para a página inicial
    } catch (err) {
      console.log(err);
    }
  };

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
        <div className="desktop-menu">
          <Link to="/programpage">Programação</Link>
          <Link to="/eventsPage/lectures">Eventos</Link>
          <Link to="/storepage">Loja</Link>
          <Link to="/">Sobre</Link>
        </div>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user" onClick={() => setDropdownOpen((prev) => !prev)}>
            <img src="/user.png" alt="User" />
            <span>Olá, {currentUser.user ? currentUser.user.name : 'Usuário'}</span>
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
            <Link to="/login" className="login-user">Entrar</Link>
            <Link to="/register" className="register">Cadastre-se</Link>
          </>
        )}
        <div className="menuIcon" onClick={() => setOpen((prev) => !prev)}>
          <img src="/menu.png" alt="Menu" />
        </div>
        <div className={open ? "menu active" : "menu"}>
          {currentUser && (
            <div className="user-info">
              <img src="/user.png" alt="User" className="user-photo" />
              <span className="user-name">Olá, {currentUser.user ? currentUser.user.name : 'Usuário'}</span>
            </div>
          )}
          <Link to="/programpage" onClick={() => setOpen(false)}>Programação</Link>
          <Link to="/eventsPage/lectures" onClick={() => setOpen(false)}>Eventos</Link>
          <Link to="/storepage" onClick={() => setOpen(false)}>Loja</Link>
          <Link to="/" onClick={() => setOpen(false)}>Sobre</Link>
          {currentUser ? (
            <>
              <Link to="/configurations" onClick={() => setOpen(false)}>Configurações</Link>
              <Link to="/inscricoes" onClick={() => setOpen(false)}>Inscrições</Link>
              <Link to="/certificates" onClick={() => setOpen(false)}>Certificados</Link>
              <button className="logout-button" onClick={() => { handleLogout(); setOpen(false); }}>Sair</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>Entrar</Link>
              <Link to="/register" onClick={() => setOpen(false)}>Cadastre-se</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
