'use client';

import React, { useState } from 'react';
import { useGlobalContext } from '@/Context/store';
import './LoginDelivery.css';
import AddDeliveryForm from '../AddDeliveryForm/AddDeliveryForm';
import { firestore } from '@/assets/firebase';

const LoginDelivery: React.FC = () => {
  const { dataCss, deliveryArea, handleDeleteDeliveryArea } =
    useGlobalContext();

  const handlePriceChange = async (newPrice: number, areaId: string) => {
    // Atualize o Firestore com o novo preço
    const collectionRef = firestore.collection('deliveryArea');
    const docRef = collectionRef.doc(areaId);
    try {
      await docRef.update({ price: newPrice });
    } catch (error) {
      console.error('Erro ao atualizar o preço:', error);
    }
  };

  return (
    <div className="login-delivery-container">
      <div className="login-delivery-title">
        <span>Entrega</span>
        <figure>
          <picture>
            <source src={dataCss.cartImage} type="image/png" />
            <img src={dataCss.cartImage} alt="icon-img" />
          </picture>
        </figure>
      </div>
      <AddDeliveryForm />
      <div className="login-delivery-area">
        {deliveryArea.map((area, index) => (
          <div key={area.id} className="login-delivery-area-div">
            <div className="login-delivery-area-info">
              <div className="login-delivery-area-distance">
                <span>Até {area.distance} Km</span>
              </div>
              <div className="login-delivery-area-price">
                <span>R$ </span>
                <input
                  type="number"
                  value={area.price}
                  onChange={(e) =>
                    handlePriceChange(Number(e.target.value), area.id)
                  }
                />
              </div>
            </div>
            {index === deliveryArea.length - 1 && deliveryArea.length > 1 && (
              <div className='login-delivery-delete'>
                <button onClick={() => handleDeleteDeliveryArea(area.id)}>
                  <figure>
                    <picture>
                      <source src={dataCss.deleteIconImage} type="image/png" />
                      <img src={dataCss.deleteIconImage} alt="icon-img" />
                    </picture>
                  </figure>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginDelivery;
