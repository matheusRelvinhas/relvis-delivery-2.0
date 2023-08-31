"use client"

import React from 'react';
import { useGlobalContext } from '@/Context/store';

const AddItemForm: React.FC = () => {

  const { title, setTitle, price, setPrice, description, setDescription, selectedCategory, setSelectedCategory, imageFile, setImageFile, optionCategories, save } = useGlobalContext();

  return (
    <form onSubmit={save}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Preço"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        required
      />
      <select
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}
        required
      >
        <option value="" disabled>
          Selecione uma categoria
        </option>
        {optionCategories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            setImageFile(file);
          }
        }}
        required
      />
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default AddItemForm;
