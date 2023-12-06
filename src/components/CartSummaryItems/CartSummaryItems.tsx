'use client';

import { useGlobalContext } from '@/Context/store';
import StyledButton from '../StyledButton/StyledButton';
import StyledInput from '../StyledInput/StyledInput';
import './CartSummaryItems.css';

interface CartSummaryItemsProps {}

const CartSummaryItems: React.FC<CartSummaryItemsProps> = ({}) => {
  const {
    dataCss,
    handleFinalizeOrder,
    cartTotal,
    handleRemoveAllItems,
    cartItems,
    items,
    totalItems,
    observation,
    setObservation,
  } = useGlobalContext();

  return (
    <>
      <div
        className="cart-summary-items-title"
        style={{ backgroundColor: dataCss.colorPrimary }}
      >
        <span style={{ color: dataCss.summaryFont }}>Carrinho</span>
        <figure>
          <picture>
            <source src={dataCss.cartImage} type="image/png" />
            <img src={dataCss.cartImage} alt="icon-img" />
          </picture>
        </figure>
      </div>
      <div
        className="cart-summary-items-container"
        style={{
          backgroundColor: dataCss.colorSecundary,
          color: dataCss.fontColor,
        }}
      >
        <ul>
          {cartItems.map((item) => {
            if (item.amount > 0) {
              return (
                <li key={item.title} className="cart-summary">
                  <div className="cart-summary-items-span">
                    <span>
                      {item.amount}x {item.title}
                    </span>
                    <span>R$ {(item.amount * item.price).toFixed(2)}</span>
                  </div>
                  <button
                    style={{
                      backgroundColor: dataCss.colorPrimary,
                      color: dataCss.buttonColor,
                    }}
                    className="button-delete-item"
                    onClick={() => handleRemoveAllItems(item.title)}
                  >
                    <span>x</span>
                  </button>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
      <div
        className="cart-summary-items"
        style={{ backgroundColor: dataCss.colorSecundary }}
      >
        <div
          className="cart-summary-items-total"
          style={{
            backgroundColor: dataCss.colorPrimary,
            borderColor: dataCss.colorSecundary,
          }}
        >
          <span style={{ color: dataCss.summaryFont }}>
            Total:R$ {cartTotal.toFixed(2)}
          </span>
          <figure>
            <picture>
              <source src={dataCss.moneyImage} type="image/png" />
              <img src={dataCss.moneyImage} alt="icon-img" />
            </picture>
          </figure>
        </div>
        <StyledInput
          label="Observação"
          placeholder=""
          type="text"
          value={observation}
          onChange={(event) => setObservation(event.target.value)}
          maxLength={100}
          minLength={0}
        />
      </div>
      <StyledButton
        normalColor={dataCss.summaryFont}
        normalBackgroundColor={dataCss.colorPrimary}
        activeBackgroundColor={dataCss.activeButtonColor}
        disabledBackgroundColor={dataCss.disabledButtonColor}
        className={`cart-summary-items-button ${
          totalItems === 0 ? 'disabled' : ''
        }`}
        onClick={handleFinalizeOrder}
        disabled={totalItems === 0}
      >
        <span>Finalizar pedido</span>
        <figure>
          <picture>
            <source src={dataCss.purchaseRequestsImage} type="image/png" />
            <img src={dataCss.purchaseRequestsImage} alt="icon-img" />
          </picture>
        </figure>
      </StyledButton>
    </>
  );
};

export default CartSummaryItems;
