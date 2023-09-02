'use client';

import CardCarousel from '../CardCarousel/CardCarousel';
import './Main.css';
import { useGlobalContext } from '@/Context/store';

export default function Main() {
  const { dataCss, categories } = useGlobalContext();
  
  return (
    <main 
      style={{color: dataCss.fontColor}}
      className='main'
    >
      {categories.map((category) => (
        <div key={category.id}>
          <CardCarousel
            category={category.category}
          />
        </div>
      ))}
    </main>
  );
}
