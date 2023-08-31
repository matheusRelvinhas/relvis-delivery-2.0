import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '@/Context/store';
import { auth } from '@/firebase';

const LoginForm: React.FC = () => {
  const { email, setEmail, password, setPassword, handleLogin } = useGlobalContext();

  return (
    <div>
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
