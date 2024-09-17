import React, { useState } from 'react';
import './AboutStyle.scss';

const About = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section className="sobre-wtisc">
      <div className="container">
        <h1>Sobre o WTISC</h1>
        <p className="subtitle">Conheça a história por trás do grande evento do campus tecnológico!</p>
        <p className="description">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s.
        </p>
        <p className="description">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s.
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
            <button className="faq-question" onClick={() => toggleFaq(0)}>
              Como eu faço pra ganhar horas complementares?
            </button>
            <p className={`faq-answer ${activeFaq === 0 ? 'active' : ''}`}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s.
            </p>
          </div>

          <div className="faq-item">
            <button className="faq-question" onClick={() => toggleFaq(1)}>
              Qual a data do evento?
            </button>
            <p className={`faq-answer ${activeFaq === 1 ? 'active' : ''}`}>
              O evento ocorrerá nos dias 25 e 26 de novembro de 2024, no campus de Quixadá.
            </p>
          </div>

          <div className="faq-item">
            <button className="faq-question" onClick={() => toggleFaq(2)}>
              Como faço para me inscrever nas atividades?
            </button>
            <p className={`faq-answer ${activeFaq === 2 ? 'active' : ''}`}>
              As inscrições podem ser feitas diretamente no site oficial do evento, na aba de inscrições.
            </p>
          </div>

          <div className="faq-item">
            <button className="faq-question" onClick={() => toggleFaq(3)}>
              Quem pode participar do WTISC?
            </button>
            <p className={`faq-answer ${activeFaq === 3 ? 'active' : ''}`}>
              O evento é aberto para alunos de todos os cursos do campus, bem como para o público externo.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
