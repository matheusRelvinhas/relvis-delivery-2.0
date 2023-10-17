'use client';

import CardCarousel from '../CardCarousel/CardCarousel';
import './Main.css';
import { useGlobalContext } from '@/Context/store';
import Search from '../Search/Search';

export default function Main() {
  const { dataCss, categories, sendOrder } = useGlobalContext();

  return (
    <main style={{ color: dataCss.fontColor }} className="main">
      <button onClick={sendOrder}>FINALIZAR</button>
      <Search />
      {categories.map((category) => (
        <div key={category.id}>
          <CardCarousel category={category.category} />
        </div>
      ))}
    </main>
  );
}
