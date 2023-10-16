'use client';

import LoginForm from '@/components/LoginForm/LoginForm';
import React from 'react';
import { useGlobalContext } from '@/Context/store';
import LoginNavigation from '@/components/LoginNavigation/LoginNavigation';
import Loading from '@/components/Loading/Loading';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

const LoginPage: React.FC = () => {
  //const { isLogin, isLoading, alertLogin, errorMessage } = useGlobalContext();
  
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
