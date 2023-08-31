"use client"

import LoginForm from '@/components/LoginForm/LoginForm';
import React from 'react';
import { useGlobalContext } from '@/Context/store';
import AddItemForm from '@/components/AddItemForm/AddItemForm';
import LoginItens from '@/components/LoginItens/LoginItens';
import AddCategoryForm from '@/components/AddCategoryForm/AddCategoryForm';
import LoginCategory from '@/components/LoginCategory/LoginCategory';

const LoginPage: React.FC = () => {
  const { isLogin } = useGlobalContext();
  
  return (
    <div>
      {isLogin ? (
        <>
          <h1>Portal Parceiro</h1>
          <AddCategoryForm />
          <AddItemForm />
          <LoginCategory />
          <LoginItens />
        </>
      ) : (
        <>
          <h1>Você não está logado. Por favor, faça login para acessar.</h1>
          <LoginForm />
        </>
      )}
    </div>
  );
};

export default LoginPage;
