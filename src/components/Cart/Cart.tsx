'use client';

import { useGlobalContext } from '@/Context/store';
import CartSummary from '../CartSummary/CartSummary';
import './Cart.css';

export default function Cart() {
  const {
    dataCss,
    isTilted,
    handleCartClick,
    cartItems,
    setCartItems,
    drinkCards,
    drinkNoAlcoolCards,
    portionsCards,
  } = useGlobalContext();

  const allCards = [...drinkCards, ...drinkNoAlcoolCards, ...portionsCards];

  const totalItems = Object.values(cartItems).reduce(
    (total, quantity) => total + quantity,
    0
  );

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
        <div className="tab-content-cart">
          <div className="tab-itens-cart">
            <CartSummary
              cartItems={cartItems}
              cards={allCards}
              setCartItems={setCartItems}
              totalItems={totalItems}
            />
          </div>
        </div>
      )}
      <div className="cart-message">
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
