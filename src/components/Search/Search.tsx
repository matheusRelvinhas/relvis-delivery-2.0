'use client';

import { useGlobalContext } from '@/Context/store';
import React from 'react';
import './Search.css';

export default function Search() {
  const { dataCss, searchQuery, setSearchQuery } = useGlobalContext();

  return (
    <div className="search">
      <div className="search-container">
        <>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Atualize a consulta de pesquisa
          />
        </>
        <>
          <figure>
            <picture>
              <source src={dataCss.searchImage} type="image/png" />
              <img src={dataCss.searchImage} alt="search-img" width={"30px"} height={"30px"} />
            </picture>
          </figure>
        </>
      </div>
    </div>
  );
}
