'use client'

import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '@/Context/store';


interface LoginCategoryProps {
  // Se necessário, você pode adicionar props personalizadas aqui
}

const LoginCategory: React.FC<LoginCategoryProps> = () => {

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