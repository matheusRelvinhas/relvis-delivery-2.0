'use client'

import React from 'react';
import { useGlobalContext } from '@/Context/store';
import AddCategoryForm from '@/components/AddCategoryForm/AddCategoryForm';

const LoginCategory: React.FC = () => {

  const { categories, handleDeleteCategory, setIsEditCategory, setCategory, setCategoryId, setLastCategory } = useGlobalContext();
  
  const handleIsEditCategory = (categoryId:string ,category:string) => {
    setLastCategory(category)
    setCategory(category)
    setCategoryId(categoryId)
    setIsEditCategory(true)
  }

  return (
    <div>
      <AddCategoryForm />
      <h2>Categorias</h2>
      {categories.map((category) => (
        <div key={category.id}>
          {category.category}
          <button onClick={() => handleIsEditCategory(category.id, category.category)}>Editar</button>
          <button onClick={() => handleDeleteCategory(category.id, category.category)}>Excluir</button>
        </div>
      ))}
    </div>
  );
};

export default LoginCategory;
