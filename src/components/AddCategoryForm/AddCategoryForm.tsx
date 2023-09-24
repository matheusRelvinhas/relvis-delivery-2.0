'use client';

import React from 'react';
import { useGlobalContext } from '@/Context/store';
import './AddCategoryForm.css';

const AddCategoryForm: React.FC = () => {
  const {
    dataCss,
    category,
    setCategory,
    addCategory,
    isEditCategory,
    categoryId,
    lastCategory,
    handleEditCategory,
    setIsEditCategory,
    isContentCategoryOpen,
    setIsContentCategoryOpen,
  } = useGlobalContext();

  const toggleContentCategory = () => {
    setCategory('');
    setIsContentCategoryOpen(!isContentCategoryOpen);
    setIsEditCategory(false);
  };

  const handleSubmitCategory = (event: React.FormEvent) => {
    event.preventDefault();
    if (isEditCategory) {
      handleEditCategory(categoryId, lastCategory);
    } else {
      addCategory();
    }
  };

  return (
    <div className="add-category-form-container">
      <button onClick={toggleContentCategory}>
        <div className="add-category-form-title">
          <span>{isContentCategoryOpen ? '-' : '+'}</span>
          <h2>{isEditCategory ? 'Editar' : 'Adicionar'}</h2>
          <figure>
            <picture>
              <source src={dataCss.categoryImage} type="image/png" />
              <img src={dataCss.categoryImage} alt="icon-img" />
            </picture>
          </figure>
        </div>
      </button>
      {isContentCategoryOpen && (
        <form onSubmit={handleSubmitCategory} className='add-category-form'>
          <input
            type="text"
            placeholder={isEditCategory ? 'editar categoria' : 'nova categoria'}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          />
          <button type="submit">
            <span>{isEditCategory ? 'Editar' : 'Adicionar'}</span>
            <figure>
              <picture>
                <source
                  src={ isEditCategory ? dataCss.editIconImage : dataCss.addIconImage }
                  type="image/png"
                />
                <img
                  src={ isEditCategory ? dataCss.editIconImage : dataCss.addIconImage }
                  alt="icon-img"
                />
              </picture>
            </figure>
          </button>
        </form>
      )}
    </div>
  );
};

export default AddCategoryForm;
