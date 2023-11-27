'use client';

import React from 'react';
import { useGlobalContext } from '@/Context/store';
//import AddCategoryForm from '@/components/AddCategoryForm/AddCategoryForm';
import './LoginComplements.css';
import AddComplementsForm from '../AddComplementsForm/AddComplementsForm';

const LoginComplements: React.FC = () => {
  const {
    dataCss,
    complementsList,
    handleDeleteCategory,
    setIsEditCategory,
    setCategory,
    setCategoryId,
    setLastCategory,
    setIsContentCategoryOpen,
    handleMoveCategoryUp,
    handleMoveCategoryDown,
    toggleActiveCategory,
    addComplementItem,
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
      <AddComplementsForm />
      <div className='login-complements-list'>
        {complementsList.map((complement) => (
          <div key={complement.id} className="login-complements-items">
            <span>{complement.complement}</span>
            <button type='button' onClick={() => addComplementItem(complement.id)}>teste</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginComplements;
