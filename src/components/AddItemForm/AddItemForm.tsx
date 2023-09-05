'use client';

import React, { useRef } from 'react';
import { useGlobalContext } from '@/Context/store';

const AddItemForm: React.FC = () => {
  const {
    title,
    setTitle,
    price,
    setPrice,
    description,
    setDescription,
    selectedCategory,
    setSelectedCategory,
    setImageFile,
    categories,
    addItem,
    isEditItem,
    itemId,
    handleEditItem,
  } = useGlobalContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmitItem = (event: React.FormEvent) => {
    event.preventDefault();
    if (isEditItem) {
      handleEditItem(itemId);
    } else {
      addItem(event);
    }
    // Redefina o valor do input file para null
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmitItem}>
      <h2>{isEditItem ? 'Editar Item' : 'Adicionar Item'}</h2>
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
        {categories.map((category) => (
          <option key={category.id} value={category.category}>
            {category.category}
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
        ref={fileInputRef}
      />
      <button type="submit">{isEditItem ? 'Editar' : 'Adicionar'}</button>
    </form>
  );
};

export default AddItemForm;
