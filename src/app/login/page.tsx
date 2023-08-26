"use client"

import LoginForm from '@/components/LoginForm/LoginForm';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/Context/store';

const LoginPage: React.FC = () => {
  const { isLogin } = useGlobalContext();
  
  const router = useRouter();

  if (isLogin) {
    router.push('/partner');
    return null; // Retornar nulo para interromper a renderização atual
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
