'use client';

import { useGlobalContext } from '@/Context/store';
import React, { useState, useEffect } from 'react';
import './Search.css';

export default function Search() {
  const { dataCss, items, setSearchResults, searchResults } = useGlobalContext();

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Função para atualizar os resultados com base na consulta de pesquisa
    const updateResults = () => {
      if (searchQuery === '') {
        // Se a consulta de pesquisa estiver vazia, exiba todos os itens
        setSearchResults(items);
      } else {
        // Caso contrário, filtre os itens com base na consulta
        const filteredItems = items?.filter((item) => {
          return (
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.price.toString().includes(searchQuery)
          );
        });
        setSearchResults(filteredItems);
      }
    };
    // Chame a função de atualização dos resultados sempre que a consulta de pesquisa ou os itens mudarem
    updateResults();
  }, [searchQuery, items, setSearchResults]);


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
              <img src={dataCss.searchImage} alt="search-img" width="30px" />
            </picture>
          </figure>
        </>
      </div>
    </div>
  );
}
