'use client';

import React, { useState } from 'react';
import LoginItens from '@/components/LoginItens/LoginItens';
import LoginCategory from '@/components/LoginCategory/LoginCategory';
import LoginPurchaseRequest from '@/components/LoginPurchaseRequest/LoginPurchaseRequest';
import LoginClient from '../LoginClient/LoginClient';
import { useGlobalContext } from '@/Context/store';
import './LoginNavigation.css';
import LoginProfile from '../LoginProfile/LoginProfile';

const LoginNavigation: React.FC = () => {
  const { dataCss, alertLogin } = useGlobalContext();

  const [activeItem, setActiveItem] = useState<string>('Perfil');
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    setIsNavOpen(false);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      {alertLogin && <div>MENSAGEM ERROR</div>}
      <div className={`login-navigation ${isNavOpen ? 'navigation-open' : ''}`}>
        <div className={`navigation-bar ${isNavOpen ? 'open' : ''}`}>
          <label className="burger" htmlFor="burger">
            <input type="checkbox" id="burger" onClick={toggleNav} checked={isNavOpen} />
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
              Clientes
            </li>
            <li
              onClick={() => handleItemClick('Categorias')}
              className={activeItem === 'Categorias' ? 'active' : ''}
            >
              Categorias
            </li>
            <li
              onClick={() => handleItemClick('Produtos')}
              className={activeItem === 'Produtos' ? 'active' : ''}
            >
              Produtos
            </li>
            <li
              onClick={() => handleItemClick('Pedidos')}
              className={activeItem === 'Pedidos' ? 'active' : ''}
            >
              Pedidos
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
