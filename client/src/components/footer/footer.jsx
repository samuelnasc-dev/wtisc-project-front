import { Link } from "react-router-dom";
import "./footerstyle.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <img src="/logo-wtisc-white.png" alt="" />
        </div>

        <div className="footer-section contact">
          <h2 className="section-title">Contato</h2>
          <p>
            <i className="fas fa-phone"></i> +55 88 9 9999-9990
          </p>
          <p>
            <i className="fas fa-envelope"></i> contatopet@ufc.br
          </p>
          <p>
            <i className="fas fa-map-marker-alt"></i> Rua da ufc, 1290 - Centro
          </p>
          <p>
            <i className="fas fa-map-marker-alt"></i> Quixadá - Ceará
          </p>
        </div>

        <div className="footer-section links">
          <h2 className="section-title">Links Úteis</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">Programação</Link></li>
            <li><Link to="/lectures">Palestras</Link></li>
            <li><Link to="/minicourses">Minicursos</Link></li>
            <li><Link to="/contact">Termos e condições</Link></li>
          </ul>
        </div>        

        <div className="footer-section social">
          <h2 className="section-title">Siga-nos</h2>
          <div className="social-links">
            <ol>
              <li><img src="/instagram.png"/></li>
              <li><img src="/youtube.png"/></li>
              <li><img src="/facebook.png"/></li>
            </ol>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Evento. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
