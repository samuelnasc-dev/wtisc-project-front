import "./productsstyle.scss";

function Products() {
    return (
      <section className="products">
        <div className="products-content">
          <div className="image-container">
            <img src="/camisa.png" alt="Produtos" />
          </div>
          <div className="infor">
            <h2 className="section-title">Conheça nossos Produtos</h2>
            <p className="section-subtitle">
              Explore os nossos produtos disponíveis e aproveite os benefícios.
            </p>
            <div className="button-container">
              <a href="/about" className="btn">Ver mais</a>
            </div>
          </div>
        </div>
      </section>
    );
}
  
export default Products;
