'use client';

import React from 'react';
import { useGlobalContext } from '@/Context/store';

const LoginPage: React.FC = () => {
  const { dataCss } = useGlobalContext();
  
  return (
    <div>
      {/*
      {isLoading && <Loading/>}
      {alertLogin && <ErrorMessage errorMessage={errorMessage}/>}
      {isLogin ? (
        <>
          <LoginNavigation/>
        </>
      ) : (
        <>
          <LoginForm />
        </>
      )}
      */}
      TESTE LOGIN
    </div>
  );
};

export default LoginPage;
