'use client';

import { useGlobalContext } from '@/Context/store';
import CartSummary from '../CartSummary/CartSummary';
import './Cart.css';

export default function Cart() {
  const {
    dataCss,
    isTilted,
    handleCartClick,
    totalItems,
  } = useGlobalContext();

  return (
    <>
      <figure className={`cart-container ${isTilted ? 'tilted' : ''}`}>
        <picture>
          <source src={dataCss.cartImage} type="image/png" />
          <img
            className={`cart-img ${isTilted ? 'tilted' : ''}`}
            src={dataCss.cartImage}
            alt="logo-img"
            onClick={handleCartClick}
          />
        </picture>
      </figure>
      {isTilted && (
        <div style={{backgroundColor: dataCss.colorPrimary}} className="tab-content-cart">
          <div className="tab-itens-cart">
            <CartSummary />
          </div>
        </div>
      )}
      <div style={{backgroundColor: dataCss.colorSecundary}} className="cart-message">
        <strong>
          {totalItems === 0
            ? 'vazio :('
            : totalItems === 1
            ? `${totalItems} item`
            : `${totalItems} itens`}
        </strong>
      </div>
    </>
  );
}
