import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./homePage.scss";
import Lectures from "./lectures/lectures";
import Minicourses from "./minicourses/minicourses";
import Products from "./products/products";
import Speakers from "./speakers/speakers";
import Sponsors from "./sponsors/sponsors";
import { Link } from "react-router-dom";

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  return (
      <div>
        <div className="homePage">
          <div className="imgContainer">
            <img src="/bg.png" alt="Workshop" />
          </div>
          <div className="textContainer">
            <div className="wrapper">
              <h1 className="title">WORKSHOP DE TECNOLOGIA DA INFORMAÇÃO DO SERTÃO CENTRAL</h1>
              <p>Dos dias 21/11 à 29/11 | UFC - Campus Quixadá</p>
              <h3>
                Lorem Ipsum é simplesmente um texto fictício da indústria de impressão e composição. Lorem Ipsum tem sido o padrão da indústria.
              </h3>
              <div className="buttons">
                <Link className="primary-button" to="/eventsPage/lectures">Participar</Link>
                <Link className="secondary-button" to="/programpage">Programação</Link>
              </div>
            </div>
          </div>
        </div>
        {/* main */}
          <Speakers/>
          <Minicourses/>
          <Sponsors/>
          <Lectures/>
          <Products/>  
      </div>
  );
}

export default HomePage;
