import "./lecturesstyle.scss";

function Lectures() {
    return (
      <section className="lectures">
        <div className="lectures-content">
          <div className="infor">
            <h2 className="section-title">Palestras</h2>
            <p className="section-subtitle">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <div className="button-container">
              <a href="#vermais" className="btn">Ver mais</a>
            </div>
          </div>
          <div className="image-container">
            <img src="/bg.png" alt="Palestras" />
          </div>
        </div>
      </section>
    );
}
  
export default Lectures;
