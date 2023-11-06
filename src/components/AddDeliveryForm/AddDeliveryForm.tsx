'use client'

import React from 'react';
import { useGlobalContext } from '@/Context/store';
import './AddDeliveryForm.css';

const AddDeliveryForm: React.FC = () => {
  const {
    dataCss,
    addCategory,
    categoryId,
    handleEditCategory,
    setIsEditCategory,
    isContentDeliveryOpen,
    setIsContentDeliveryOpen,
  } = useGlobalContext();

  const toggleContentDelivery = () => {
    setIsContentDeliveryOpen(!isContentDeliveryOpen);
  };


  return (
    <div className="add-delivery-form-container">
      <button onClick={toggleContentDelivery}>
        <div className="add-delivery-form-title">
          <span>{isContentDeliveryOpen ? '-' : '+'}</span>
          <span>Taxa de Entrega</span>
          <figure>
            <picture>
              <source src={dataCss.cartImage} type="image/png" />
              <img src={dataCss.cartImage} alt="icon-img" />
            </picture>
          </figure>
        </div>
      </button>
      {isContentDeliveryOpen && (
        <div>
          oi
        </div>
      )}
    </div>
  );
};

export default AddDeliveryForm;
