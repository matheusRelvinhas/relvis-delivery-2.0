'use client';

import React, { useState } from 'react';
import AddItemForm from '@/components/AddItemForm/AddItemForm';
import LoginItens from '@/components/LoginItens/LoginItens';
import AddCategoryForm from '@/components/AddCategoryForm/AddCategoryForm';
import LoginCategory from '@/components/LoginCategory/LoginCategory';
import { useGlobalContext } from '@/Context/store';
import './LoginNavigation.css';


const LoginNavigation: React.FC = () => {

  const { alertLogin } = useGlobalContext();
  
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
    {alertLogin && (
        <div>
            MENSAGEM ERROR
        </div>
    )}
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
            onClick={() => handleItemClick('Cadastro Categorias')}
            className={activeItem === 'Cadastro Categorias' ? 'active' : ''}
          >
            Cadastro Categorias
          </li>
          <li
            onClick={() => handleItemClick('Cadastro Produtos')}
            className={activeItem === 'Cadastro Produtos' ? 'active' : ''}
          >
            Cadastro Produtos
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
        {activeItem === 'Início' && <div>Conteúdo do Início</div>}
        {activeItem === 'Clientes' && <div>Conteúdo dos Clientes</div>}
        {activeItem === 'Cadastro Categorias' && (
          <div>
            <AddItemForm/>
            <LoginItens/>
          </div>
        )}
        {activeItem === 'Cadastro Produtos' && (
          <div>
            <AddCategoryForm/>
            <LoginCategory/>
          </div>
        )}
        {activeItem === 'Perfil' && <div>Conteúdo do Perfil</div>}
        {activeItem === 'Pedidos' && <div>Conteúdo dos Pedidos</div>}
      </div>
    </div>
    </>
  );
};

export default LoginNavigation;