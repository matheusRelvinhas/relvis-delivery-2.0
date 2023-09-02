"use client"

import LoginForm from '@/components/LoginForm/LoginForm';
import React from 'react';
import { useGlobalContext } from '@/Context/store';
import LoginNavigation from '@/components/LoginNavigation/LoginNavigation';

const LoginPage: React.FC = () => {
  const { isLogin } = useGlobalContext();
  
  return (
    <div>
      {isLogin ? (
        <>
          <LoginNavigation/>
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
