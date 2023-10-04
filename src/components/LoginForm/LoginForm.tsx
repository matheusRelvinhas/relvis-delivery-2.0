'use client'

import React from 'react';
import { useGlobalContext } from '@/Context/store';
import './LoginForm.css';

const LoginForm: React.FC = () => {
  const { dataCss, email, setEmail, password, setPassword, handleLogin } =
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
        <button onClick={handleLogin}>
          <span>Entrar</span>
          <figure>
            <picture>
              <source src={dataCss.loginImage} type="image/png" />
              <img src={dataCss.loginImage} alt="icon-img" />
            </picture>
          </figure>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
