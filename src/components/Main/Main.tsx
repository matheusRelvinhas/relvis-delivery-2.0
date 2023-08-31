'use client';

import CardCarousel from '../CardCarousel/CardCarousel';
import './Main.css';
import { useGlobalContext } from '@/Context/store';

export default function Main() {
  const { drinkCards, drinkNoAlcoolCards, portionsCards, cartItems, dataCss } = useGlobalContext();
  
  return (
    <main 
      style={{color: dataCss.fontColor}}
      className='main'
    >
      <CardCarousel
        cards={drinkCards}
        category={drinkCards[0].category}
      />
      <CardCarousel
        cards={drinkNoAlcoolCards}
        category={drinkNoAlcoolCards[0].category}
      />
      <CardCarousel
        cards={portionsCards}
        category={portionsCards[0].category}
      />
    </main>
  );
}
