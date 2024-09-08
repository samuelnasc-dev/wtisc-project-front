import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";
import "./navbar.scss";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  useEffect(() => {
    if (currentUser) {
      console.log('currentUser:', currentUser); // Verifique a estrutura do currentUser
      fetch();
    }
  }, [currentUser, fetch]);

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo-wtisc.png" alt="" />
        </a>
        <a href="/">Programação</a>
        <a href="/">Palestras</a>
        <a href="/">Minicursos</a>
        <a href="/">Sobre</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            {currentUser.name ? (
              <span className="username">{currentUser.name}</span>
            ) : (
              <span className="username">Nome não disponível</span>
            )}
            <Link to="/profile" className="profile">
              {/* {number > 0 && <div className="notification">{number}</div>} */}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Entrar</a>
            <a href="/register" className="register">
              Cadastre-se
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Programação</a>
          <a href="/">Palestras</a>
          <a href="/">Minicursos</a>
          <a href="/">Sobre</a>
          <a href="/">Entrar</a>
          <a href="/">Cadastre-se</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
