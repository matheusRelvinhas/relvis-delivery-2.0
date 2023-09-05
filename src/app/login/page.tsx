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
          <LoginForm />
        </>
      )}
    </div>
  );
};

export default LoginPage;
