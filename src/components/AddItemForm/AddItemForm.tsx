"use client"

import React, { FormEvent, useState } from 'react';
import { database } from '@/firebase';

interface ItemData {
  newTitle: string;
  newDescription: string;
  newPrice: string;
  newImage: string;
}

const AddItemForm: React.FC = () => {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImage, setNewImage] = useState('');

  console.log(newTitle, newDescription, newPrice, newImage);

  function save(event: FormEvent) {
    event.preventDefault();

    const ref = database.ref('item');

    const data: ItemData = {
      newTitle,
      newDescription,
      newPrice,
      newImage,
    };

    ref.push(data);
    setNewTitle('');
    setNewDescription('');
    setNewPrice('');
    setNewImage('');
  }

  return (
    <form onSubmit={save}>
      <input
        type="text"
        placeholder="título"
        value={newTitle}
        onChange={event => setNewTitle(event.target.value)}
      />
      <input
        type="text"
        placeholder="descrição"
        value={newDescription}
        onChange={event => setNewDescription(event.target.value)}
      />
      <input
        type="text"
        placeholder="preço"
        value={newPrice}
        onChange={event => setNewPrice(event.target.value)}
      />
      <input
        type="text"
        placeholder="image"
        value={newImage}
        onChange={event => setNewImage(event.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default AddItemForm;
