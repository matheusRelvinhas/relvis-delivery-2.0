'use client';

import { useGlobalContext } from '@/Context/store';
import './About.css';

const About: React.FC = () => {
  const { dataCss } = useGlobalContext();

  return (
    <div className="about-container" style={{ color: dataCss.summaryFont }}>
      <div className="about-div">
        <h4>Funcionamento</h4>
        <p>Segunda a sexta-feira: 10:00 - 18:00</p>
        <p>Sábado: 10:00 - 14:00</p>
      </div>
      <div className="about-div">
        <h4>Endereço</h4>
        <p>Rua: Itororó, 889 - Padre Eustáquio</p>
        <p>Belo Horizonte - MG</p>
      </div>
      <div className="about-div">
        <h4>Forma de Pagamento</h4>
        <p>Dinheiro</p>
        <p>Pix</p>
        <p>Crédito</p>
        <p>Débito</p>
        <p>Refeição</p>
      </div>
      <div className="about-div">
        <h4>Contato</h4>
        <p>Tel.: 31 99999-9999</p>
        <p>E-mail: seuemail@dominio.com</p>
        <figure>
          <a href="https://api.whatsapp.com/send?phone=+5531971451910">
            <picture>
              <source src={dataCss.whatsImage} type="image/png" />
              <img
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
  );
};

export default About;
