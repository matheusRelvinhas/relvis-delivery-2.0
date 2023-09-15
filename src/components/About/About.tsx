'use client';

import { useGlobalContext } from '@/Context/store';
import './About.css';

const About: React.FC = () => {
  const { dataCss } = useGlobalContext();

  return (
    <div className="about-container" style={{ color: dataCss.summaryFont }}>
      <div className="about-div">
        <div className='about-title'>
          <h4>Funcionamento</h4>
          <figure>
            <picture>
              <source src={dataCss.iconAbout.operation} type="image/png" />
              <img
                src={dataCss.iconAbout.operation}
                width="28.5px"
                alt="whats-icon"
              />
            </picture>
        </figure>
        </div>
        <div>
          <p>Segunda a sexta-feira: 10:00 - 18:00</p>
          <p>Sábado: 10:00 - 14:00</p>
        </div>
      </div>
      <div className="about-div">
      <div className='about-title'>
        <h4>Endereço</h4>
        <figure>
            <picture>
              <source src={dataCss.iconAbout.local} type="image/png" />
              <img
                src={dataCss.iconAbout.local}
                width="28.5px"
                alt="whats-icon"
              />
            </picture>
        </figure>
      </div>
        <div>
        <p>Rua: Itororó, 889 - Padre Eustáquio</p>
        <p>Belo Horizonte - MG</p>
        </div>
      </div>
      <div className="about-div">
        <div className='about-title'>
          <h4>Pagamento</h4>
          <figure>
            <picture>
              <source src={dataCss.iconAbout.payment} type="image/png" />
              <img
                src={dataCss.iconAbout.payment}
                width="28.5px"
                alt="whats-icon"
              />
            </picture>
        </figure>
        </div>
        <div>
        <p>Dinheiro</p>
        <p>Pix</p>
        <p>Crédito</p>
        <p>Débito</p>
        <p>Refeição</p>
        </div>
      </div>
      <div className="about-div">
        <div className='about-title'>
          <h4>Contato</h4>
          <figure>
            <picture>
              <source src={dataCss.iconAbout.contact} type="image/png" />
              <img
                src={dataCss.iconAbout.contact}
                width="28.5px"
                alt="whats-icon"
              />
            </picture>
        </figure>
        </div>
        <div>
        <p>Cel.: 31 99999-9999</p>
        <p>E-mail: seuemail@dominio.com</p>
        <figure>
          <a href="https://api.whatsapp.com/send?phone=+5531971451910">
            <picture>
              <source src={dataCss.whatsImage} type="image/png" />
              <img className='whats'
                src={dataCss.whatsImage}
                width="30px"
                height="30px"
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
