'use client'

import React from 'react';
import { useGlobalContext } from '@/Context/store';

interface AddCategoryFormProps {
  // Se necessário, você pode adicionar props personalizadas aqui
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = () => {

  const { category, setCategory, addCategory } = useGlobalContext();

  return (
    <div>
      <h2>Adicionar Categoria</h2>
      <input
        type="text"
        placeholder="Nova Categoria"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      />
      <button onClick={addCategory}>Adicionar e Salvar</button>
    </div>
  );
};

export default AddCategoryForm;
