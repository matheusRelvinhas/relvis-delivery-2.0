import React from 'react';
import { useGlobalContext } from '@/Context/store';
import './LoginProfile.css';
import LoginMessage from '../LoginMessage/LoginMessage';
import { firestore } from '@/firebase';

const LoginProfile: React.FC = () => {
  const { dataCss, isLogin, handleLogout, isOpenStore } = useGlobalContext();
  
  const handleEditOpenStore = async (openStore:boolean) => {
    const collectionRef = firestore.collection('openStore');
    const openStoreRef = collectionRef.doc('openStoreID');
    const isOpen = !openStore;
    try {
      const updatedOpenStoreData = {
        openStore: isOpen,
      };
      await openStoreRef.update(updatedOpenStoreData);
      console.log('Loja aberta / fechada com sucesso!');
      } catch (error) {
      console.error('Erro ao editar mensagem:', error);
    }
  };

  return (
    <div className="login-profile-container">
      Perfil
      {isLogin && (
        <>
          <p>Você está logado.</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      <div>
        {isOpenStore ? 'Loja Aberta' : 'Loja Fechada'}
        <button onClick={() => handleEditOpenStore(isOpenStore)}>{isOpenStore ? 'Fechar' : 'Abrir'}</button>
      </div>
      <LoginMessage />
    </div>
  );
};

export default LoginProfile;
