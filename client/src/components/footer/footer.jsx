import { Link } from "react-router-dom";
import "./footerstyle.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className="section-title">Sobre o Evento</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices.
          </p>
        </div>

        <div className="footer-section links">
          <h2 className="section-title">Links Úteis</h2>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/about">Sobre</Link></li>
            <li><Link to="/lectures">Palestras</Link></li>
            <li><Link to="/minicourses">Minicursos</Link></li>
            <li><Link to="/contact">Contato</Link></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h2 className="section-title">Contato</h2>
          <p>
            <i className="fas fa-phone"></i> +55 123 456 7890
          </p>
          <p>
            <i className="fas fa-envelope"></i> contato@evento.com
          </p>
          <p>
            <i className="fas fa-map-marker-alt"></i> Rua Exemplo, 123, Cidade,
            País
          </p>
        </div>

        <div className="footer-section social">
          <h2 className="section-title">Siga-nos</h2>
          <div className="social-links">
            <a href="https://facebook.com"><i className="fab fa-facebook"></i></a>
            <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
            <a href="https://instagram.com"><i className="fab fa-instagram"></i></a>
            <a href="https://linkedin.com"><i className="fab fa-linkedin"></i></a>
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
