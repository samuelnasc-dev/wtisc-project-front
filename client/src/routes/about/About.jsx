import React from 'react';
import './AboutStyle.scss';

const About = () => {
  return (
    <section className="sobre-wtisc">
      <div className="container">
        <h1>Sobre o WTISC</h1>
        <p className="subtitle">Conheça a história por trás do grande evento do campus tecnológico!</p>
        <p className="description">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen.
        </p>
        <p className="description">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen.
        </p>

        <div className="contact">
          <h2>Contato</h2>
          <p>+55 88 9 9999-9990</p>
          <p>contatoatpe@ufc.br</p>
          <p>Rua da ufc, 1290 - Centro</p>
          <p>Quixadá - Ceará</p>
        </div>

        <div className="faq">
          <h2>Perguntas Frequentes</h2>
          <div className="faq-item">
            <button className="faq-question">Como eu faço pra dançar no meio da ufc?</button>
            <p className="faq-answer">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s.
            </p>
          </div>
          {/* Adicionar mais itens FAQ */}
        </div>
      </div>
    </section>
  );
};

export default About;
