'use client'

import React from 'react';
import { useGlobalContext } from '@/Context/store';

const AddCategoryForm: React.FC = () => {

  const { category, setCategory, addCategory, isEditCategory, categoryId, lastCategory, handleEditCategory } = useGlobalContext();

  const handleSubmitCategory = (event: React.FormEvent) => {
    event.preventDefault();
    if (isEditCategory) {
      handleEditCategory(categoryId, lastCategory);
    } else {
      addCategory();
    }
  };

  return (
    <form onSubmit={handleSubmitCategory}>
      <h2>{isEditCategory ? 'Editar Categoria' : 'Adicionar Categoria'}</h2>
      <input
        type="text"
        placeholder="Nova Categoria"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        required
      />
      <button type='submit'>{isEditCategory ? 'Editar' : 'Adicionar'}</button>
    </form>
  );
};

export default AddCategoryForm;
