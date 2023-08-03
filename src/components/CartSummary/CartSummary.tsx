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
}

const CartSummary: React.FC<CartSummaryProps> = ({ cartItems ,cards, setCartItems }) => {
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
      [title]: 0, // Atualiza a quantidade para 0
    }));
  };

  return (
    <div className="cart-summary-container">
      <div className="cart-summary">
      <h2>Carrinho</h2>
      <ul>
        {Object.entries(cartItems).map(([title, quantity]) => {
          const card = cards.find(card => card.title === title);
          const totalPrice = card ? card.price * quantity : 0;
          if (quantity > 0) {
            return (
              <li key={title}>
                <span>{quantity}x {title}</span>
                <span>${totalPrice.toFixed(2)}</span>
                <button className='button-delete-item' onClick={() => handleRemoveItem(title)}>X</button>
              </li>
            );
          }    
          return null;
        })}
      </ul>
      <h2>Total: ${cartTotal.toFixed(2)}</h2>
    </div>
      <button 
        className='cart-button'
        onClick={handleFinalizeOrder}
      >
        <h1>Finalizar pedido</h1>
      </button>
    </div>
  );
};

export default CartSummary;