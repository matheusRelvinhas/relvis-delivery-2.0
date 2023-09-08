'use client';

import { useGlobalContext } from '@/Context/store';
import './Search.css';

export default function Search() {
  const { dataCss, categories } = useGlobalContext();

  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  return (
    <div className="search">
      <div className="search-container">
        <input type="text" className="search-input" placeholder="Buscar" />
        <figure >
        <picture>
          <source src={dataCss.searchImage} type="image/png" />
          <img
            src={dataCss.searchImage}
            alt="search-img"
            width='30px'
          />
        </picture>
      </figure>
      </div>
    </div>
  );
}
