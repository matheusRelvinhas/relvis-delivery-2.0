'use client';

import React, { useState } from 'react';
import LoginItens from '@/components/LoginItens/LoginItens';
import LoginCategory from '@/components/LoginCategory/LoginCategory';
import LoginPurchaseRequest from '@/components/LoginPurchaseRequest/LoginPurchaseRequest';
import LoginClient from '../LoginClient/LoginClient';
import { useGlobalContext } from '@/Context/store';
import './LoginNavigation.css';

const LoginNavigation: React.FC = () => {
  const { alertLogin, isLogin, handleLogout } = useGlobalContext();

  const [activeItem, setActiveItem] = useState<string>('Início');
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
          <div className="hamburger" onClick={toggleNav}>
            &#9776;
          </div>
          <ul>
            <li
              onClick={() => handleItemClick('Início')}
              className={activeItem === 'Início' ? 'active' : ''}
            >
              Início
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
              onClick={() => handleItemClick('Perfil')}
              className={activeItem === 'Perfil' ? 'active' : ''}
            >
              Perfil
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
          {activeItem === 'Início' && (
            <div>
              {isLogin && (
                <>
                  <p>Você está logado.</p>
                  <button onClick={handleLogout}>Logout</button>
                </>
              )}
            </div>
          )}
          {activeItem === 'Clientes' && (
            <div>
              <LoginClient />
            </div>
          )}
          {activeItem === 'Categorias' && (
            <div>
              <LoginCategory />
            </div>
          )}
          {activeItem === 'Produtos' && (
            <div>
              <LoginItens />
            </div>
          )}
          {activeItem === 'Perfil' && (
            <div>
              Perdil
            </div>
          )}
          {activeItem === 'Pedidos' && (
            <div>
              <LoginPurchaseRequest />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginNavigation;
