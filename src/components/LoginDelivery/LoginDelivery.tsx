'use client'

import React from 'react';
import { useGlobalContext } from '@/Context/store';
import './LoginDelivery.css';
import AddDeliveryForm from '../AddDeliveryForm/AddDeliveryForm';


const LoginDelivery: React.FC = () => {
  const { dataCss, deliveryArea } = useGlobalContext();

  return (
    <div className="login-delivery-container">
      <div className="login-delivery-title">
        <span>Entrega</span>
        <figure>
            <picture>
              <source src={dataCss.cartImage} type="image/png" />
              <img
                src={dataCss.cartImage}
                alt="icon-img"
              />
            </picture>
        </figure>
      </div>
      <AddDeliveryForm/>
      {deliveryArea.map((area) => (
          <div key={area.id} className="login-delivery-area">
            <span>{area.order}</span>
            <span>{area.price}</span>
          </div>
        ))}
    </div>
  );
};

export default LoginDelivery;
