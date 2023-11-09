'use client';

import React from 'react';
import { useGlobalContext } from '@/Context/store';
import './LoginPromotion.css';

const LoginPromotion: React.FC = () => {
  const {
    dataCss,
    categories,
    toggleActivePromotionCategory,
  } = useGlobalContext();


  return (
    <div className="login-promotion-container">
      <div className="login-promotion-title">
        <span>Promoções</span>
        <figure>
          <picture>
            <source src={dataCss.promotionImage} type="image/png" />
            <img src={dataCss.promotionImage} alt="icon-img" />
          </picture>
        </figure>
      </div>
      <div className='login-promotion-category'>
        <div className='login-promotion-category-title'>
          <span>Entrega grátis por categoria</span>
        </div>
        {categories.map((category) => (
          <div key={category.id} className="login-promotion-categories">
            <span>{category.category}</span>
            <div className="login-promotion-categories-title-active">
                <button
                  onClick={() =>
                    toggleActivePromotionCategory(category.id, category.deliveryPromotion)
                  }
                >
                  <div className="toggle-switch">
                    <input
                      className="toggle-input"
                      id="toggle"
                      type="checkbox"
                      checked={category.deliveryPromotion}
                    />
                    <label className="toggle-label"></label>
                  </div>
                </button>
                <div className="login-promotion-categories-span">
                  <span>{category.deliveryPromotion ? 'Ligado' : 'Desligado'}</span>
                </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginPromotion;
