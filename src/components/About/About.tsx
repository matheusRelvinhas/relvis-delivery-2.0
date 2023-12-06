'use client';

import { useGlobalContext } from '@/Context/store';
import './About.css';

const About: React.FC = () => {
  const { dataCss } = useGlobalContext();

  return (
    <div className="about-container">
      <div className="about-item">
        <div className="about-title" style={{ color: dataCss.summaryFont }}>
          <span>Funcionamento</span>
          <figure>
            <picture>
              <source src={dataCss.iconAbout.operation} type="image/png" />
              <img
                src={dataCss.iconAbout.operation}
                alt="local-icon"
              />
            </picture>
          </figure>
        </div>
        <div style={{ background: dataCss.colorThird, color: dataCss.fontColor }} className="about-info">
          <span>Segunda a sábado: 08:00 - 14:00 horas</span>
          <span>Domingo não abre</span>
        </div>
      </div>
      <div className="about-item">
        <div className="about-title" style={{ color: dataCss.summaryFont }}>
          <h4>Endereço</h4>
          <figure>
            <picture>
              <source src={dataCss.iconAbout.local} type="image/png" />
              <img
                src={dataCss.iconAbout.local}
                alt="whats-icon"
              />
            </picture>
          </figure>
        </div>
        <div style={{ background: dataCss.colorThird, color: dataCss.fontColor }} className="about-info">
          <span>Rua Vereador Geraldo Pereira - Padre Eustáquio</span>
          <span>Belo Horizonte - MG</span>
        </div>
      </div>
      <div className="about-item">
        <div className="about-title" style={{ color: dataCss.summaryFont }}>
          <span>Pagamento</span>
          <figure>
            <picture>
              <source src={dataCss.iconAbout.payment} type="image/png" />
              <img
                src={dataCss.iconAbout.payment}
                alt="payment-icon"
              />
            </picture>
          </figure>
        </div>
        <div style={{ background: dataCss.colorThird, color: dataCss.fontColor }} className="about-info">
          <span>Dinheiro</span>
          <span>Pix</span>
          <span>Crédito</span>
          <span>Débito</span>
          <span>Refeição</span>
        </div>
      </div>
      <div className="about-item">
        <div className="about-title" style={{ color: dataCss.summaryFont }}>
          <span>Contato</span>
          <figure>
            <picture>
              <source src={dataCss.iconAbout.contact} type="image/png" />
              <img
                src={dataCss.iconAbout.contact}
                alt="about-icon"
              />
            </picture>
          </figure>
        </div>
        <div style={{ background: dataCss.colorThird, color: dataCss.fontColor }} className="about-info">
          <span>Cel.: 31 971451910</span>
          <span>Fixo: 31 2515-1005</span>
          <span>E-mail: matheusrelvinhas@gmail.com</span>
          <figure>
            <a href={`https://api.whatsapp.com/send?phone=+55${dataCss.cellPhone}&text=Oi, tudo bem?`}>
              <picture>
                <source src={dataCss.iconAbout.whats} type="image/png" />
                <img
                  className="whats"
                  src={dataCss.iconAbout.whats}
                  alt="whats-icon"
                />
              </picture>
            </a>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default About;
