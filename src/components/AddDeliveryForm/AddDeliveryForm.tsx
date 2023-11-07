'use client'

import React from 'react';
import { useGlobalContext } from '@/Context/store';
import './AddDeliveryForm.css';

const AddDeliveryForm: React.FC = () => {
  const {
    dataCss,
    deliveryRadius,
    setDeliveryRadius,
    addDeliveryRadius,
    addDeliveryArea,
    isContentDeliveryOpen,
    setIsContentDeliveryOpen,
  } = useGlobalContext();

  const toggleContentDelivery = () => {
    setIsContentDeliveryOpen(!isContentDeliveryOpen);
  };

  const handleSubmitDelivery = (event: React.FormEvent) => {
    event.preventDefault();
    addDeliveryRadius(deliveryRadius);
  };

  return (
    <div className="add-delivery-form-container">
      <button onClick={toggleContentDelivery}>
        <div className="add-delivery-form-title">
          <span>{isContentDeliveryOpen ? '-' : '+'}</span>
          <span>Adicionar</span>
          <figure>
            <picture>
              <source src={dataCss.cartImage} type="image/png" />
              <img src={dataCss.cartImage} alt="icon-img" />
            </picture>
          </figure>
        </div>
      </button>
      {isContentDeliveryOpen && (
        <div className="add-delivery-form">
          <div className="add-delivery-form-radius">
            <span>Raio de Entrega</span>
            <form onSubmit={handleSubmitDelivery}>
              <input
                type="number"
                value={deliveryRadius}
                onChange={(event) => setDeliveryRadius(parseFloat(event.target.value))}
                required
              />
              <button type='submit'>Atualizar</button>
            </form>
          </div>
          <div>
            <span>Adicionar área</span>
            <button onClick={addDeliveryArea}>
              <span>ADICIONAR</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDeliveryForm;
