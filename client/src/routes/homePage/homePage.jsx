import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Palestrantes from "../palestrantes/palestrantes";
import "./homePage.scss";

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
                <button className="primary-button">Participar</button>
                <button className="secondary-button">Programação</button>
              </div>
            </div>
          </div>
        </div>
        <Palestrantes/>
      </div>
  );
}

export default HomePage;
