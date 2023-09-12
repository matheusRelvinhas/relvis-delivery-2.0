import React from 'react';
import { useGlobalContext } from '@/Context/store';
import { firestore } from '@/firebase';
import AddClientForm from '../AddClientForm/AddClientForm';

const LoginClient: React.FC = () => {
  const { clients, setNameClient, setCellphoneClient, setCepClient, setRoadClient, setNumberClient, setComplementClient, setDistrictClient, setCityClient, setStateClient, setIsEditClient, setClientId } = useGlobalContext();
  
  const handleIsEditClient = (client:any) => {
    setClientId(client.id);
    setNameClient(client.name);
    setCellphoneClient(client.cellphone);
    setCepClient(client.cep);
    setRoadClient(client.road);
    setNumberClient(client.number);
    setComplementClient(client.complement);
    setDistrictClient(client.district);
    setCityClient(client.city)
    setStateClient(client.state)
    setIsEditClient(true);
  }

  const handleDeleteClient = async (clientId: string) => {
    try {
      const collectionRef = firestore.collection('clients');
      await collectionRef.doc(clientId).delete();
    } catch (error) {
      console.error('Erro ao excluir cliente', error);
    }
  };

  return (
    <div>
      <AddClientForm/>
      <h2>Clientes</h2>
      {clients?.map((client) => (
        <div key={client.id}>
          <p>{client.name}</p>
          <p>{client.cellphone}</p>
          <p>{client.road}, {client.number}, {client.complement}, {client.district}, {client.city} - {client.state} - {client.cep}</p>
          <div>
            <button onClick={() => handleIsEditClient(client)}>Editar</button>
            <button onClick={() => handleDeleteClient(client.id)}>Excluir</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoginClient;