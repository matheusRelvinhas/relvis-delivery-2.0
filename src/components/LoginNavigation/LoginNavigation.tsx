'use client';

import React from 'react';
import { useGlobalContext } from '@/Context/store';
import LoginItens from '@/components/LoginItens/LoginItens';
import LoginCategory from '@/components/LoginCategory/LoginCategory';
import LoginPurchaseRequest from '@/components/LoginPurchaseRequest/LoginPurchaseRequest';
import LoginClient from '../LoginClient/LoginClient';
import LoginProfile from '../LoginProfile/LoginProfile';
import './LoginNavigation.css';
import LoginDelivery from '../LoginDelivery/LoginDelivery';

const LoginNavigation: React.FC = () => {
  const { dataCss, activeItem, setActiveItem, isNavOpen, setIsNavOpen } =
    useGlobalContext();

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    setIsNavOpen(false);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <div className={`login-navigation ${isNavOpen ? 'navigation-open' : ''}`}>
        <div className={`navigation-bar ${isNavOpen ? 'open' : ''}`}>
          <label className="burger" htmlFor="burger">
            <input
              type="checkbox"
              id="burger"
              onClick={toggleNav}
              checked={isNavOpen}
            />
            <span></span>
            <span></span>
            <span></span>
          </label>
          <ul>
            <li
              onClick={() => handleItemClick('Perfil')}
              className={activeItem === 'Perfil' ? 'active' : ''}
            >
              <div className="login-navigation-li">
                <figure>
                  <picture>
                    <source src={dataCss.storeImage} type="image/png" />
                    <img src={dataCss.storeImage} alt="icon-img" />
                  </picture>
                </figure>
                <span>Perfil</span>
              </div>
            </li>
            <li
              onClick={() => handleItemClick('Clientes')}
              className={activeItem === 'Clientes' ? 'active' : ''}
            >
              <div className="login-navigation-li">
                <figure>
                  <picture>
                    <source src={dataCss.clientsImage} type="image/png" />
                    <img src={dataCss.clientsImage} alt="icon-img" />
                  </picture>
                </figure>
                <span>Clientes</span>
              </div>
            </li>
            <li
              onClick={() => handleItemClick('Categorias')}
              className={activeItem === 'Categorias' ? 'active' : ''}
            >
              <div className="login-navigation-li">
                <figure>
                  <picture>
                    <source src={dataCss.categoryImage} type="image/png" />
                    <img src={dataCss.categoryImage} alt="icon-img" />
                  </picture>
                </figure>
                <span>Categorias</span>
              </div>
            </li>
            <li
              onClick={() => handleItemClick('Produtos')}
              className={activeItem === 'Produtos' ? 'active' : ''}
            >
              <div className="login-navigation-li">
                <figure>
                  <picture>
                    <source src={dataCss.itemsImage} type="image/png" />
                    <img src={dataCss.itemsImage} alt="icon-img" />
                  </picture>
                </figure>
                <span>Produtos</span>
              </div>
            </li>
            <li
              onClick={() => handleItemClick('Entrega')}
              className={activeItem === 'Entrega' ? 'active' : ''}
            >
              <div className="login-navigation-li">
                <figure>
                  <picture>
                    <source src={dataCss.cartImage} type="image/png" />
                    <img src={dataCss.cartImage} alt="icon-img" />
                  </picture>
                </figure>
                <span>Entrega</span>
              </div>
            </li>
            <li
              onClick={() => handleItemClick('Pedidos')}
              className={activeItem === 'Pedidos' ? 'active' : ''}
            >
              <div className="login-navigation-li">
                <figure>
                  <picture>
                    <source
                      src={dataCss.purchaseRequestsImage}
                      type="image/png"
                    />
                    <img src={dataCss.purchaseRequestsImage} alt="icon-img" />
                  </picture>
                </figure>
                <span>Pedidos</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="content">
          {activeItem === 'Perfil' && (
            <div className="rest-content">
              <LoginProfile />
            </div>
          )}
          {activeItem === 'Clientes' && (
            <div className="rest-content">
              <LoginClient />
            </div>
          )}
          {activeItem === 'Categorias' && (
            <div className="rest-content">
              <LoginCategory />
            </div>
          )}
          {activeItem === 'Produtos' && (
            <div className="rest-content">
              <LoginItens />
            </div>
          )}
          {activeItem === 'Entrega' && (
            <div className="rest-content">
              <LoginDelivery />
            </div>
          )}
          {activeItem === 'Pedidos' && (
            <div className="rest-content">
              <LoginPurchaseRequest />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginNavigation;
