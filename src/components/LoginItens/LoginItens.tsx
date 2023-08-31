'use client';

import React from 'react';
import { useGlobalContext } from '@/Context/store';

const LoginItens: React.FC = () => {
  const { isLogin, handleLogout, items } = useGlobalContext();

  return (
    <div>
      {isLogin && (
        <>
          <p>Você está logado.</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      {items?.map((item) => (
        <div key={item.chave}>
          <figure className='logo-container'>
            <picture>
              <source src={item.image} type="image/webp" />
              <source src={item.image} type="image/png" />
              <source src={item.image} type="image/jpeg" />
              <img src={item.image} height='100px' width='100px' alt={item.title} />
            </picture>
          </figure>
          <h3>Titulo: {item.title}</h3>
          <p>Descrição: {item.description}</p>
          <p>Preço: {item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default LoginItens;
