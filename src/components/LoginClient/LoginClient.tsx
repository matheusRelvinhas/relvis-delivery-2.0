import React from 'react';
import { useGlobalContext } from '@/Context/store';
import { firestore } from '@/firebase';
import AddClientForm from '../AddClientForm/AddClientForm';

const LoginClient: React.FC = () => {
  const {
    dataCss,
    clients,
    setNameClient,
    setCellphoneClient,
    setCepClient,
    setRoadClient,
    setNumberClient,
    setComplementClient,
    setDistrictClient,
    setIsEditClient,
    setClientId,
  } = useGlobalContext();

  const handleIsEditClient = (client: any) => {
    setClientId(client.id);
    setNameClient(client.name);
    setCellphoneClient(client.cellphone);
    setCepClient(client.cep);
    setRoadClient(client.road);
    setNumberClient(client.number);
    setComplementClient(client.complement);
    setDistrictClient(client.district);
    setIsEditClient(true);
  };

  const handleDeleteClient = async (clientId: string) => {
    try {
      const collectionRef = firestore.collection('clients');
      await collectionRef.doc(clientId).delete();
    } catch (error) {
      console.error('Erro ao excluir cliente', error);
    }
  };
  
  const sendWhats = (cellphone:string) => {
    const message = 'Olá, segue nosso cardápio, agora vc pode pedir direto de nossa plataforma https://relvis-delivery-2.vercel.app'
    const whatsappLink = `https://api.whatsapp.com/send?phone=+55${cellphone}&text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  }

  return (
    <div>
      <AddClientForm />
      <h2>Clientes</h2>
      {clients?.map((client) => (
        <div key={client.id}>
          <p>{client.name}</p>
          <p>{client.cellphone}</p>
          <p>
            {client.road}, {client.number}, {client.complement},{' '}
            {client.district} - {client.cep}
          </p>
          <div>
            <button onClick={() => handleIsEditClient(client)}>Editar</button>
            <button onClick={() => handleDeleteClient(client.id)}>
              Excluir
            </button>
            <button onClick={() => sendWhats(client.cellphone)}>whats</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoginClient;
