import React from 'react';
import { useGlobalContext } from '@/Context/store';
import { firestore } from '@/firebase';
import './LoginMessage.css';

const LoginMessage: React.FC = () => {
  const { dataCss, message, setMessage, isEditMessage, setIsEditMessage, setIsLoading } = useGlobalContext();

  const handleEditMessage = async (message:string) => {
    setIsLoading(true);
    const collectionRef = firestore.collection('message');
    const messageRef = collectionRef.doc('messageID');
    try {
      const updatedMessageData = {
        message: message,
      };
      await messageRef.update(updatedMessageData);
      } catch (error) {
      console.error('Erro ao editar mensagem:', error);
    }
    setIsLoading(false);
  };

  const handleIsEditMessage = () => {
    if (isEditMessage) {
      handleEditMessage(message)
      setIsEditMessage(false)
    } else {
      setIsEditMessage(true)
    }
  };

  return (
    <div className="login-message-container">
      <>
      <textarea
        rows={20}
        placeholder="Configurar messagem clientes"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        disabled={!isEditMessage}
      />
      </>
      <>
      <button
        onClick={handleIsEditMessage}
      >
        { isEditMessage ? 'Salvar Menssagem' : 'Editar Menssagem'}
        <figure >
          <picture>
            <source src={dataCss.whatsImage} type="image/png" />
              <img
                src={dataCss.whatsImage}
                alt="icon-img"
              />
          </picture>
        </figure>
      </button>
      </>
    </div>
  );
};

export default LoginMessage;
