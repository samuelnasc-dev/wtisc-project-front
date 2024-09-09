import "./minicoursestyle.scss";
import { Link } from "react-router-dom";

function Minicourses() {
    return (
      <section className="minicourses">
        <div className="minicourses-content">
            <div className="infor">
                <h2 className="section-title">Minicursos</h2>
                <div className="button-container">
                  <Link to="./eventsPage/minicourses" className="btn">Ver mais</Link>
                </div>
            </div>
            <p className="section-subtitle">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.
            </p>
        </div>
      </section>
    );
  }
  
  export default Minicourses;