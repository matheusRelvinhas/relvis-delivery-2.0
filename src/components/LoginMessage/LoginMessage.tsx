import React from 'react';
import { useGlobalContext } from '@/Context/store';
import { firestore } from '@/firebase';
import './LoginMessage.css';

const LoginMessage: React.FC = () => {
  const { dataCss, message, setMessage, isEditMessage, setIsEditMessage } = useGlobalContext();
  
  const handleEditMessage = async (message:string) => {
    const collectionRef = firestore.collection('message');
    const messageRef = collectionRef.doc('messageID');
    try {
      const updatedMessageData = {
        message: message,
      };
      await messageRef.update(updatedMessageData);
      console.log('Mensagem editada com sucesso!');
      } catch (error) {
      console.error('Erro ao editar mensagem:', error);
    }
  };

  const handleIsEditMessage = () => {
    if (isEditMessage) {
      console.log('salvo')
      handleEditMessage(message)
      setIsEditMessage(false)
    } else {
      console.log('editar')
      setIsEditMessage(true)
    }
  };

  return (
    <div className="login-message-container">
      <textarea
        rows={10}
        placeholder="Configurar messagem clientes"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        disabled={!isEditMessage}
      />
      <button
        onClick={handleIsEditMessage}
      >
        { isEditMessage ? 'Salvar Menssagem' : 'Editar Menssagem'}
      </button>
    </div>
  );
};

export default LoginMessage;
