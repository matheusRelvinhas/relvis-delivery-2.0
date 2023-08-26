"use client"

import React, { useEffect, useState } from 'react';
import { database } from '@/firebase';

type Item = {
  chave: string,
  newTitle: string,
  newDescription: string,
  newPrice: string,
  newImage: string,
}

const LoginItens: React.FC = () => {
  
  const [itens, setItens] = useState<Item[]>();

  useEffect(() => {
    const refItens = database.ref('item');
    refItens.on('value', result => {
      const resultItens = Object.entries<Item>(result.val() ?? {}).map(([chave, value]) => {
        return {
          'chave': chave,
          'newTitle': value.newTitle,
          'newDescription': value.newDescription,
          'newPrice': value.newPrice,
          'newImage': value.newImage,
        }
      })
      setItens(resultItens)
    })
  }, [])
  
  return (
    <div>
    {itens?.map(item => (
      <div key={item.chave}>
        <p>Titulo: {item.newTitle}</p>
        <p>Descrição: {item.newDescription}</p>
        <p>Preço: {item.newPrice}</p>
        <p>Imagem: {item.newImage}</p>
      </div>
    ))}
  </div>
  );
};

export default LoginItens;
