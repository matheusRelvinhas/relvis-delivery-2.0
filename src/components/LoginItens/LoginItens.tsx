'use client';

import React from 'react';
import AddItemForm from '@/components/AddItemForm/AddItemForm';
import { useGlobalContext } from '@/Context/store';

const LoginItens: React.FC = () => {
  const { items, handleDeleteItem, setItemId, setIsEditItem, setTitle, setDescription, setPrice, setLastImage } = useGlobalContext();
  
  const handleIsEditItem = (item:any) => {
    setItemId(item.id)
    setTitle(item.title)
    setDescription(item.description)
    setPrice(item.price)
    setLastImage(item.image)
    setIsEditItem(true)
  }

  return (
    <div>
      <AddItemForm />
      {items?.map((item) => (
        <div key={item.id}>
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
          <p>Categoria: {item.category}</p>
          <button onClick={() => handleIsEditItem(item)}>Editar</button>
          <button onClick={() => handleDeleteItem(item.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
};

export default LoginItens;
