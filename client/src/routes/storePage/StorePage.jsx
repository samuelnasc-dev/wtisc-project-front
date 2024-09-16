import React from "react";
import "./Storestyle.scss";

const StorePage = () => {
  return (
    <div className="store">
      <h1>Loja</h1>
      <p className="store-subtitle">nOSOSAD PORDUTOS BONITOS ESTÃao disponíveis para vcs</p>
      <div className="product-list">
        <div className="product-card">
          <img src="/path-to-tshirt.png" alt="T-shirt WTISC" />
          <div className="product-info">
            <h3>Nova T-Shirt WTISC</h3>
            <h2>ROBOZÃO, ROBOZINHO</h2>
            <p>R$ 39,00</p>
            <span>Camiseta WTISC Edição 2024 - Indústria 5.0</span>
            <button>Comprar</button>
          </div>
        </div>

        <div className="product-card">
          <img src="/path-to-ecobag.png" alt="Ecobag WTISC" />
          <div className="product-info">
            <h3>Nova Ecobag</h3>
            <h2>SAMUEL LINDÃO</h2>
            <p>R$ 29,00</p>
            <span>Ecobag WTISC Edição 2024 - Indústria 5.0</span>
            <button>Comprar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
