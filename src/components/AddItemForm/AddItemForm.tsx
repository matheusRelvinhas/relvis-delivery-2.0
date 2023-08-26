"use client"

import React, { FormEvent, useState } from 'react';
import { database } from '@/firebase'

const AddItemForm: React.FC = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newImage, setNewImage] = useState('')
  
  console.log(newTitle, newDescription, newPrice, newImage)
  
  function save(event) {
    event.preventDefault()

    const ref = database.ref('item')

    const dates = {
      newTitle,
      newDescription,
      newPrice,
      newImage,
    }
    ref.push(dates)
    setNewTitle('');
    setNewDescription('');
    setNewPrice('');
    setNewImage('');
  }

  return (
    <form onSubmit={ save }>
      <input type="text" placeholder="título" onChange={event => setNewTitle(event.target.value)}/>
      <input type="text" placeholder="descrição" onChange={event => setNewDescription(event.target.value)}/>
      <input type="text" placeholder="preço" onChange={event => setNewPrice(event.target.value)}/>
      <input type="text" placeholder="image" onChange={event => setNewImage(event.target.value)}/>
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default AddItemForm;
