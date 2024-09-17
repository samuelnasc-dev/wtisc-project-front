import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import "./navbar.scss";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null); // Referência para o menu
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

  // Detecta clique fora do menu e fecha o dropdown e o menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Função para alternar o menu
  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  // Função para fechar o menu
  const closeMenu = () => {
    setOpen(false);
  };

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
          <Link to="/about">Sobre</Link>
        </div>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user" onClick={() => setDropdownOpen((prev) => !prev)}>
            <img src="/user.png" alt="User" />
            <span>Olá, {currentUser.user ? currentUser.user.name : 'Usuário'}</span>
            {dropdownOpen && (
              <div className="dropdown" ref={dropdownRef}>
                <Link to="/configurations" onClick={() => setDropdownOpen(false)}>Configurações</Link>
                <Link to="/inscricoes" onClick={() => setDropdownOpen(false)}>Inscrições</Link>
                <Link to="/certificates" onClick={() => setDropdownOpen(false)}>Certificados</Link>
                <button className="logout-button" onClick={() => { handleLogout(); setDropdownOpen(false); }}>Sair</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="login-user">Entrar</Link>
            <Link to="/register" className="register">Cadastre-se</Link>
          </>
        )}
        <div className="menuIcon" onClick={toggleMenu}>
          <img src="/menu.png" alt="Menu" />
        </div>
        <div ref={menuRef} className={open ? "menu active" : "menu"}>
          {currentUser && (
            <div className="user-info">
              <img src="/user.png" alt="User" className="user-photo" />
              <span className="user-name">Olá, {currentUser.user ? currentUser.user.name : 'Usuário'}</span>
            </div>
          )}
          <Link to="/programpage" onClick={closeMenu}>Programação</Link>
          <Link to="/eventsPage/lectures" onClick={closeMenu}>Eventos</Link>
          <Link to="/storepage" onClick={closeMenu}>Loja</Link>
          <Link to="/about" onClick={closeMenu}>Sobre</Link>
          {currentUser ? (
            <>
              <Link to="/configurations" onClick={closeMenu}>Configurações</Link>
              <Link to="/inscricoes" onClick={closeMenu}>Inscrições</Link>
              <Link to="/certificates" onClick={closeMenu}>Certificados</Link>
              <button className="logout-button" onClick={() => { handleLogout(); closeMenu(); }}>Sair</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>Entrar</Link>
              <Link to="/register" onClick={closeMenu}>Cadastre-se</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
