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
      <div className='cart-summary-itens'>
        <h2  style={{ color: dataCss.summaryFont }}>Carrinho</h2>
      </div>
      <div className="cart-summary">
        <ul>
          {Object.entries(cartItems).map(([title, quantity]) => {
            const card = items?.find((card) => card.title === title);
            const totalPrice = card ? card.price * quantity : 0;
            if (quantity > 0) {
              return (
                <li key={title}>
                  <div className="cart-summary-span">
                    <span style={{ color: dataCss.summaryFont }}>
                      {quantity}x {title}
                    </span>
                    <span style={{ color: dataCss.summaryFont }}>
                      R${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <button
                    style={{
                      backgroundColor: dataCss.colorSecundary,
                      color: dataCss.buttonColor,
                    }}
                    className="button-delete-item"
                    onClick={() => handleRemoveAllItems(title)}
                  >
                    X
                  </button>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
      <div className='cart-summary-itens'>
      <h2>Total: R${cartTotal.toFixed(2)}</h2>
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
        normalBackgroundColor={dataCss.colorSecundary}
        activeBackgroundColor={dataCss.activeButtonColor}
        className={`cart-button ${totalItems === 0 ? 'disabled' : ''}`}
        onClick={handleFinalizeOrder}
        disabled={totalItems === 0}
      >
        <h1>Finalizar pedido</h1>
      </StyledButton>
    </>
  );
};

export default CartSummaryItems;
