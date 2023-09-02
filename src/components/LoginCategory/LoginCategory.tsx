'use client'

import React from 'react';
import { useGlobalContext } from '@/Context/store';

const LoginCategory: React.FC = () => {

  const { categories, handleDeleteCategory } = useGlobalContext();

  return (
    <div>
      <h2>Categorias Salvas</h2>
      {categories.map((category) => (
        <div key={category.id}>
          {category.category}
          <button onClick={() => handleDeleteCategory(category.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
};

export default LoginCategory;