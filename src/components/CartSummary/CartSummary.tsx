'use client';

import { useGlobalContext } from '@/Context/store';
import StyledButton from '../StyledButton/StyledButton';
import './CartSummary.css';


type Card = {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

interface CartSummaryProps {
  cartItems: Record<string, number>;
  cards: Card[];
  setCartItems: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  totalItems: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ cartItems ,cards, setCartItems, totalItems }) => {
  
  const { dataCss } = useGlobalContext();

  const cartTotal = Object.entries(cartItems).reduce((total, [title, quantity]) => {
    const card = cards.find(card => card.title === title);
    if (card && quantity > 0) {
      total += card.price * quantity;
    }
    return total;
  }, 0);

  const handleFinalizeOrder = () => {
    const cartSummaryElement = (document.querySelector('.cart-summary') as HTMLInputElement | null);
    const cartSummaryText = cartSummaryElement?.innerText || '';
    const message = `Pedido Novo !!
      ${cartSummaryText}`.replace(/X/g, '-------');
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://api.whatsapp.com/send?phone=+5531971451910&text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
  };

  const handleRemoveItem = (title: string) => {
    setCartItems(prevCartItems => ({
      ...prevCartItems,
      [title]: 0,
    }));
  };

  return (
    <div className="cart-summary-container">
      <div className="cart-summary">
      <h2 style={{color: dataCss.summaryFont}}>Carrinho</h2>
      <ul>
        {Object.entries(cartItems).map(([title, quantity]) => {
          const card = cards.find(card => card.title === title);
          const totalPrice = card ? card.price * quantity : 0;
          if (quantity > 0) {
            return (
              <li key={title}>
                <div className='cart-summary-span'>
                  <span style={{color: dataCss.summaryFont}}>{quantity}x {title}</span>
                  <span style={{color: dataCss.summaryFont}}>R${totalPrice.toFixed(2)}</span>
                </div>
                <button 
                  style={{backgroundColor: dataCss.colorSecundary, color: dataCss.buttonColor}} 
                  className='button-delete-item' 
                  onClick={() => handleRemoveItem(title)}
                >
                  X
                </button>
              </li>
            );
          }    
          return null;
        })}
      </ul>
      <h2>Total: R${cartTotal.toFixed(2)}</h2>
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
    </div>
  );
};

export default CartSummary;
