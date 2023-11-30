'use client';

import React from 'react';
import { useGlobalContext } from '@/Context/store';
import './AddDeliveryForm.css';

const AddDeliveryForm: React.FC = () => {
  const {
    dataCss,
    deliveryRadius,
    addDeliveryRadius,
    addDeliveryArea,
    isContentDeliveryOpen,
    setIsContentDeliveryOpen,
    isEditDelivery,
    setIsEditDelivery,
    inputDeliveryRadius,
    setInputDeliveryRadius,
  } = useGlobalContext();

  const toggleContentDelivery = () => {
    setIsContentDeliveryOpen(!isContentDeliveryOpen);
    setIsEditDelivery(false);
  };

  const handleSubmitDelivery = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isEditDelivery) {
      setIsEditDelivery(true);
      setInputDeliveryRadius(deliveryRadius);
    } else {
      addDeliveryRadius(parseFloat(inputDeliveryRadius));
      setIsEditDelivery(false);
    }
  };

  const handleDeliveryRadiusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let input = event.target.value;
    input = input.replace(/\D/g, '');
    if (input !== '') {
      input = (parseFloat(input) / 10).toFixed(1);
    }
    setInputDeliveryRadius(input)
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
              {isEditDelivery ? (
                <input
                  className="add-delivery-form-radius-input"
                  type="number"
                  value={inputDeliveryRadius}
                  onChange={handleDeliveryRadiusChange}
                  required
                />
              ) : (
                <div className="add-delivery-form-radius-km">
                  <span>{deliveryRadius} Km</span>
                </div>
              )}
              <button type="submit">
                {isEditDelivery ? (
                  <div className="add-delivery-div-buttons">
                    <span>Atualizar</span>
                    <figure>
                      <picture>
                        <source src={dataCss.toUpdateImage} type="image/png" />
                        <img src={dataCss.toUpdateImage} alt="icon-img" />
                      </picture>
                    </figure>
                  </div>
                ) : (
                  <div className="add-delivery-div-buttons">
                    <span>Editar</span>
                    <figure>
                      <picture>
                        <source src={dataCss.editIconImage} type="image/png" />
                        <img src={dataCss.editIconImage} alt="icon-img" />
                      </picture>
                    </figure>
                  </div>
                )}
              </button>
            </form>
          </div>
          <div className="add-delivery-form-button">
            <button onClick={addDeliveryArea}>
              <span>Adicionar Área</span>
              <figure>
                <picture>
                  <source src={dataCss.addIconImage} type="image/png" />
                  <img src={dataCss.addIconImage} alt="icon-img" />
                </picture>
              </figure>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDeliveryForm;
