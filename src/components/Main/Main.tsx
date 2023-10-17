'use client';

import CardCarousel from '../CardCarousel/CardCarousel';
import './Main.css';
import { useGlobalContext } from '@/Context/store';
import Search from '../Search/Search';
import StyledButton from '../StyledButton/StyledButton';

export default function Main() {
  const { dataCss, categories, sendOrder, isFinalizeOrder, name, orderMessage } =
    useGlobalContext();

  return (
    <main style={{ color: dataCss.fontColor }} className="main">
      <Search />
      {categories.map((category) => (
        <div key={category.id}>
          <CardCarousel category={category.category} />
        </div>
      ))}
      {isFinalizeOrder && (
        <div className="tab-content-finalize-order">
          <div className='tab-content-finalize-order-massage-container'>
            <div className='tab-content-finalize-order-massage'> 
              <span>{`${name}, pedido ${orderMessage} feito !`}</span>
              <span>{`Nos envie uma mensagem para acompanhar seu pedido.`}</span>
            </div>
            <StyledButton
              normalColor={dataCss.summaryFont}
              normalBackgroundColor={dataCss.colorPrimary}
              activeBackgroundColor={dataCss.activeButtonColor}
              disabledBackgroundColor={dataCss.disabledButtonColor}
              onClick={sendOrder}
              className="button-tab-content-finalize-order"
            >
              <span>Enviar mensagem</span>
              <figure>
                <picture>
                  <source
                    src={dataCss.whatsImage}
                    type="image/png"
                  />
                  <img src={dataCss.whatsImage} alt="icon-img" />
                </picture>
              </figure>
            </StyledButton>
          </div>
        </div>
      )}
    </main>
  );
}
