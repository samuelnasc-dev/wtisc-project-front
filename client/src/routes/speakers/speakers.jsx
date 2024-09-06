import "./speakerstyle.scss";

function Speakers() {
    const speakers = [
      { id: 1, name: "Beyoncé Knowless", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", img: "/p1.png" },
      { id: 2, name: "Pitty", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", img: "/p2.png" },
      { id: 3, name: "Gil do Vigor", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", img: "/p3.png" },
      { id: 4, name: "Anitta", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", img: "/p4.png" },
      { id: 5, name: "Madonna", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", img: "/speaker-ex.png" },
      { id: 6, name: "Kenye West", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", img: "/p5.png" }
    ];
  
    return (
      <section className="speakers">
        <h2 className="section-title">Palestrantes</h2>
        <p className="section-subtitle">Conheça os especialistas que vão transformar sua perspectiva no nosso evento!</p>
        <div className="speakers-grid">
          {speakers.map((speaker) => (
            <div key={speaker.id} className="speaker-card">
              <div className="speaker-img">
                <img src={speaker.img} alt={speaker.name} />
              </div>
              <div className="speaker-info">
                <h3>{speaker.name}</h3>
                <p>{speaker.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="button-container">
          <a href="#conhecer" className="btn">Conheça os palestrantes</a>
        </div>
      </section>
    );
  }
  
  export default Speakers;
  