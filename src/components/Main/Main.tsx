'use client';

import CardCarousel from '../CardCarousel/CardCarousel';
import './Main.css';
import { useGlobalContext } from '@/Context/store';

type Card = {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export default function Main() {
  const { drinkCards, drinkNoAlcoolCards, portionsCards, cartItems, setCartItems, dataCss } = useGlobalContext();
  
  const handleAddItem = (card: Card) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [card.title]: (prevItems[card.title] || 0) + 1,
    }));
  };

  const handleRemoveItem = (card: Card) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[card.title] > 0) {
        updatedItems[card.title] -= 1;
      }
      return updatedItems;
    });
  };

  const handleQuantityChange = (card: Card, e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (isNaN(newQuantity)) return;

    setCartItems((prevItems) => ({
      ...prevItems,
      [card.title]: newQuantity,
    }));
  };

  const getItemQuantity = (card: Card) => {
    return cartItems[card.title] || 0;
  };

  const cartTotal = Object.entries(cartItems).reduce((total, [title, quantity]) => {
    const card = drinkCards.find(card => card.title === title); // Use drinkCards aqui
    if (card) {
      total += card.price * quantity;
    }
    return total;
  }, 0);

  return (
    <main 
      style={{color: dataCss.fontColor}}
      className='main'
    >
      <CardCarousel
        cards={drinkCards}
        category={drinkCards[0].category}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        handleQuantityChange={handleQuantityChange}
        getItemQuantity={getItemQuantity}
        cartTotal={cartTotal}
      />
      <CardCarousel
        cards={drinkNoAlcoolCards}
        category={drinkNoAlcoolCards[0].category}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        handleQuantityChange={handleQuantityChange}
        getItemQuantity={getItemQuantity}
        cartTotal={cartTotal}
      />
      <CardCarousel
        cards={portionsCards}
        category={portionsCards[0].category}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        handleQuantityChange={handleQuantityChange}
        getItemQuantity={getItemQuantity}
        cartTotal={cartTotal}
      />
    </main>
  );
}
