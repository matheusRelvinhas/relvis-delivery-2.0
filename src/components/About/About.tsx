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
                alt="whats-icon"
              />
            </picture>
          </figure>
        </div>
        <div style={{ background: dataCss.colorThird, color: dataCss.fontColor }} className="about-info">
          <span>Segunda a sexta-feira: 10:00 - 18:00</span>
          <span>Sábado: 10:00 - 14:00</span>
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
          <span>Rua: Itororó, 889 - Padre Eustáquio</span>
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
                alt="whats-icon"
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
                alt="whats-icon"
              />
            </picture>
          </figure>
        </div>
        <div style={{ background: dataCss.colorThird, color: dataCss.fontColor }} className="about-info">
          <span>Cel.: 31 99999-9999</span>
          <span>E-mail: seuemail@dominio.com</span>
          <figure>
            <a href="https://api.whatsapp.com/send?phone=+5531971451910">
              <picture>
                <source src={dataCss.whatsImage} type="image/png" />
                <img
                  className="whats"
                  src={dataCss.whatsImage}
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
