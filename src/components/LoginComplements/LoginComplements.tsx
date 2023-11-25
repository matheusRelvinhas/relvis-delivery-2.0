'use client';

import React from 'react';
import { useGlobalContext } from '@/Context/store';
//import AddCategoryForm from '@/components/AddCategoryForm/AddCategoryForm';
import './LoginComplements.css';

const LoginComplements: React.FC = () => {
  const {
    dataCss,
    categories,
    handleDeleteCategory,
    setIsEditCategory,
    setCategory,
    setCategoryId,
    setLastCategory,
    setIsContentCategoryOpen,
    handleMoveCategoryUp,
    handleMoveCategoryDown,
    toggleActiveCategory,
  } = useGlobalContext();

  const handleIsEditCategory = (categoryId: string, category: string) => {
    setIsContentCategoryOpen(true);
    setLastCategory(category);
    setCategory(category);
    setCategoryId(categoryId);
    setIsEditCategory(true);
  };

  return (
    <div className="login-complements-container">
      <div className="login-complements-title">
        <span>Complementos</span>
        <figure>
          <picture>
            <source src={dataCss.complementsImage} type="image/png" />
            <img src={dataCss.complementsImage} alt="icon-img" />
          </picture>
        </figure>
      </div>
    </div>
  );
};

export default LoginComplements;
