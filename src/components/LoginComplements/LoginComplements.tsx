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
    handleDeleteComplements,
    handleDeleteItemComplements,
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
      <div className="login-complements-list">
        {complementsList.map((complement) => (
          <div key={complement.id} className="login-complements-items">
            <div>
              <span>{complement.complement}</span>
              <button type="button" onClick={() => handleDeleteComplements(complement.id)}>Remover</button>
            </div>
            {complement.complements && (
              <ul>
                {complement.complements.map((complementItem) => (
                  <li key={complement.id}>
                    <div>
                      <span>{complementItem.title}</span>
                      <span>R$ {complementItem.price}</span>
                      <button type="button" onClick={() => handleDeleteItemComplements(complement.id, complementItem.order)}>Remover</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div></div>
            <div>
              <button
                type="button"
                onClick={() => addComplementItem(complement.id)}
              >
                Adicionar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginComplements;
