'use client';

import { useGlobalContext } from '@/Context/store';
import CartSummary from '../CartSummary/CartSummary';
import './Cart.css';

export default function Cart() {
  const { dataCss, isTilted, handleCartClick, totalItems } = useGlobalContext();

  return (
    <>
      <div className="cart-img-container">
        <figure>
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
      </div>
      {isTilted && (
        <div
          style={{ backgroundColor: dataCss.colorPrimary }}
          className="tab-content-cart"
        >
          <CartSummary />
        </div>
      )}
      <div
        style={{
          backgroundColor: dataCss.colorPrimary,
          color: dataCss.summaryFont,
          borderColor: dataCss.colorSecundary,
        }}
        className="cart-message"
      >
        <span>
          {totalItems === 0
            ? 'vazio :('
            : totalItems === 1
            ? `${totalItems} item`
            : `${totalItems} itens`}
        </span>
      </div>
    </>
  );
}
