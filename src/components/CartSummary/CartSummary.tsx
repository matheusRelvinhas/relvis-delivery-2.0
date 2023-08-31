'use client';

import { useGlobalContext } from '@/Context/store';
import CartSummaryItems from '../CartSummaryItems/CartSummaryItems';
import FormContact from '../FormContact/FormContact';
import StyledButton from '../StyledButton/StyledButton';
import './CartSummary.css';

interface CartSummaryProps {
}

const CartSummary: React.FC<CartSummaryProps> = () => {

  const { dataCss, isBuy } = useGlobalContext();
  
  return (
    <div className="cart-summary-container">
      {isBuy ? (
        <FormContact />
      ) : (
        <CartSummaryItems />
      )}
    </div>
  );
};

export default CartSummary;
