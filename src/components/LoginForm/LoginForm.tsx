'use client';

import React from 'react';
import { useGlobalContext } from '@/Context/store';
import './LoginForm.css';

const LoginForm: React.FC = () => {
  const { email, setEmail, password, setPassword, handleLogin } =
    useGlobalContext();

  return (
    <div className="login-form-container">
      <div className="login-form">
        <h1>E-mail</h1>
        <input
          type="email"
          placeholder="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h1>Senha</h1>
        <input
          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Entrar</button>
      </div>
    </div>
  );
};

export default LoginForm;
