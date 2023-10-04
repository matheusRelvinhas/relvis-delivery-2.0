'use client'

import React from 'react';
import { useGlobalContext } from '@/Context/store';
import './LoginProfile.css';
import LoginMessage from '../LoginMessage/LoginMessage';
import { firestore } from '@/assets/firebase';

const LoginProfile: React.FC = () => {
  const { dataCss, isLogin, handleLogout, isOpenStore, setIsLoading } = useGlobalContext();

  const handleEditOpenStore = async (openStore: boolean) => {
    setIsLoading(true);
    const collectionRef = firestore.collection('openStore');
    const openStoreRef = collectionRef.doc('openStoreID');
    const isOpen = !openStore;
    try {
      const updatedOpenStoreData = {
        openStore: isOpen,
      };
      await openStoreRef.update(updatedOpenStoreData);
    } catch (error) {
      console.error('Erro ao editar status da loja:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-profile-container">
      <div className="login-profile-title">
        <span>Perfil</span>
        <figure >
            <picture>
              <source src={dataCss.storeImage} type="image/png" />
              <img
                src={dataCss.storeImage}
                alt="icon-img"
              />
            </picture>
        </figure>
      </div>
      <div className="login-profile">
        <div className="login-profile-logged">
          <h1>Bem vindo, {dataCss.profileName} !!</h1>
        </div>
        <div className="login-profile-open-store">
          {isOpenStore ? 'Loja Aberta' : 'Loja Fechada'}
          <div className="toggle-switch">
            <input
              className="toggle-input"
              id="toggle"
              type="checkbox"
              checked={isOpenStore}
              onClick={() => handleEditOpenStore(isOpenStore)}
            />
            <label className="toggle-label" htmlFor="toggle"></label>
          </div>
        </div>
        {isLogin && (
          <button onClick={handleLogout}>
            <span>Sair</span>
            <figure >
              <picture>
                <source src={dataCss.logoutImage} type="image/png" />
                <img
                  src={dataCss.logoutImage}
                  alt="icon-img"
                />
              </picture>
            </figure>
          </button>
        )}
      </div>
      <div className='login-margin'></div>
      <LoginMessage />
      <div className='login-margin'></div>
    </div>
  );
};

export default LoginProfile;
