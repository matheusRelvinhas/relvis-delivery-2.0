'use client'

import React from 'react';
import { useGlobalContext } from '@/Context/store';
import './LoginDelivery.css';
import AddDeliveryForm from '../AddDeliveryForm/AddDeliveryForm';


const LoginDelivery: React.FC = () => {
  const { dataCss } = useGlobalContext();

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
    </div>
  );
};

export default LoginDelivery;
