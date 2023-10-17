'use client';

import React from 'react';
import { useGlobalContext } from '@/Context/store';
import AddCategoryForm from '@/components/AddCategoryForm/AddCategoryForm';
import './LoginCategory.css';

const LoginCategory: React.FC = () => {
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
  } = useGlobalContext();

  const handleIsEditCategory = (categoryId: string, category: string) => {
    setIsContentCategoryOpen(true);
    setLastCategory(category);
    setCategory(category);
    setCategoryId(categoryId);
    setIsEditCategory(true);
  };

  return (
    <div className="login-category-container">
      <div className="login-category-title">
        <span>Categorias</span>
        <figure>
          <picture>
            <source src={dataCss.categoryImage} type="image/png" />
            <img src={dataCss.categoryImage} alt="icon-img" />
          </picture>
        </figure>
      </div>
      <AddCategoryForm />
      <div className="login-category-list">
        {categories.map((category) => (
          <div key={category.id} className="login-category-items">
            <div className="login-category-items-title">
              <div className="login-category-items-name">
                <figure>
                  <picture>
                    <source src={dataCss.categoryItemImage} type="image/png" />
                    <img src={dataCss.categoryItemImage} alt="icon-img" />
                  </picture>
                </figure>
                <span>{category.category}</span>
              </div>
            </div>
            <div className="login-category-buttons">
              <button
                onClick={() =>
                  handleIsEditCategory(category.id, category.category)
                }
              >
                <figure>
                  <picture>
                    <source src={dataCss.editIconImage} type="image/png" />
                    <img src={dataCss.editIconImage} alt="icon-img" />
                  </picture>
                </figure>
              </button>
              <div>
                <button
                  onClick={() =>
                    handleMoveCategoryUp(category.id, category.order)
                  }
                >
                  <figure>
                    <picture>
                      <source src={dataCss.arrowImage.up} type="image/png" />
                      <img
                        src={dataCss.arrowImage.up}
                        alt="icon-img"
                        height={'10px'}
                        width={'17.5px'}
                      />
                    </picture>
                  </figure>
                </button>
                <button
                  onClick={() =>
                    handleMoveCategoryDown(category.id, category.order)
                  }
                >
                  <figure>
                    <picture>
                      <source src={dataCss.arrowImage.down} type="image/png" />
                      <img
                        src={dataCss.arrowImage.down}
                        alt="icon-img"
                        height={'10px'}
                        width={'17.5px'}
                      />
                    </picture>
                  </figure>
                </button>
              </div>
              <button
                onClick={() =>
                  handleDeleteCategory(category.id, category.category)
                }
              >
                <figure>
                  <picture>
                    <source src={dataCss.deleteIconImage} type="image/png" />
                    <img src={dataCss.deleteIconImage} alt="icon-img" />
                  </picture>
                </figure>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginCategory;
