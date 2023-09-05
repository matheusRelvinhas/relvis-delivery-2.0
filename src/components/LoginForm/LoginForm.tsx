'use client'

import React from 'react';
import { useGlobalContext } from '@/Context/store';


const LoginForm: React.FC = () => {
  const { email, setEmail, password, setPassword, handleLogin } = useGlobalContext();

  return (
    <div>
      <h1>Você não está logado. Por favor, faça login para acessar.</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
