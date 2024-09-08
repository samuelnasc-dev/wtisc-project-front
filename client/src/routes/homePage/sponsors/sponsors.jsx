import "./sponsorsstyle.scss";

function Sponsors() {
    return (
      <section className="sponsors">
        <div className="sponsors-content">
          <h2 className="section-title">Patrocinadores</h2>
          <div className="logos-container">
            <img src="/spon1.png" alt="Patrocinador 1" />
            <img src="/spon2.png" alt="Patrocinador 2" />
            <img src="/spon3.png" alt="Patrocinador 3" />
            <img src="/spon4.png" alt="Patrocinador 4" />
          </div>
        </div>
      </section>
    );
}
  
export default Sponsors;